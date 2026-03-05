import { inputBuilder } from "./item.persistence";
import { BaseItemSchema } from "./item.schema";
import { Item } from "@/app/types";
import { findUniqueItem, upsertItemRecord } from "./item.repository";
import { mapApiItemToDomain } from "./item.mapper";
import { getRequiredStatBlock, isStale } from "./item.helpers";

import * as items from "@/app/data";

export async function getItem(id: string): Promise<Item | null> {
  let item = await findUniqueItem(id);

  if (!item || !item.statBlock || isStale(item.lastFetched)) {
    const itemFromApi = await fetchApiItem(id);
    if (!itemFromApi) return null;

    const validatedItem = validateApiItem(itemFromApi);
    if (!validatedItem) {
      console.error(`Failed to validate API item data for id ${id}`);
      return null;
    }

    const normalizedItem = mapApiItemToDomain(validatedItem);
    item = await upsertItem(normalizedItem);
  }

  if (!item) {
    console.error(`Could not fetch or upsert item`);
    return null;
  }

  const statBlock = getRequiredStatBlock(item.statBlock);

  // TODO: fix this type assertion
  return {
    ...item,
    statBlock,
  } as Item;
}

export default async function upsertItem(ApiDataItem: Item) {
  const { createInput, updateInput } = inputBuilder;

  const createdItem = createInput(ApiDataItem);
  const updatedItem = updateInput(ApiDataItem);

  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("inserting...", ApiDataItem.id);
    }

    return await upsertItemRecord(ApiDataItem.id, createdItem, updatedItem);
  } catch (e) {
    console.error(`Failed to insert item:`, e);
    return null;
  }
}

async function fetchApiItem(id: string): Promise<any | null> {
  // fake API call - find item from local data
  // return Object.values(items).find((item) => item.id === id);

  const res = await fetch(
    `https://metaforge.app/api/arc-raiders/items?id=${id}&includeComponents=true`,
    {
      cache: "force-cache",
      next: { revalidate: 60 * 60 },
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch item:", res.statusText);
    return null;
  }

  return (await res.json()).data[0];
}

function validateApiItem(item: any) {
  const parsed = BaseItemSchema.safeParse(item);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Validation errors:",
        parsed.error.issues.map((issue) => {
          (issue.message, issue.path);
        }),
      );
    }
    return null;
  }

  return parsed.data;
}
