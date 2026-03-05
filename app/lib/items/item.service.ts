import { itemMapper } from "./item.persistence";
import { BaseItemSchema } from "./item.schema";
import { Item } from "@/app/types";
import { findUniqueItem, upsertItemRecord } from "./item.repository";
import { mapApiItemToDomain } from "./item.mapper";

import * as items from "@/app/data";

// TODO: fix the any types in this file, especially the type assertion in getItem function. Maybe we can add a separate type for the API response and validate against that instead of the internal Item type which has some differences (e.g. statBlock can be null from API but is required in our internal type)
function getRequiredStatBlock(stat: Item["statBlock"] | null) {
  return (
    stat ?? {
      weight: null,
      stackSize: null,
    }
  );
}

export async function getItem(id: string): Promise<Item | null> {
  let item = await findUniqueItem(id);

  if (!item || !item.statBlock || isStale(item.lastFetched)) {
    // real API call to fetch item data, then upsert into DB
    const res = await fetch(
      `https://metaforge.app/api/arc-raiders/items?id=${id}&includeComponents=true`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60,
        },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch item:", res.statusText);
      return null;
    }

    const itemFromApi = (await res.json()).data[0];

    // fake API call - find item from local data
    // const itemFromApi = Object.values(items).find((item) => item.id === id);

    const parsed = BaseItemSchema.safeParse(itemFromApi);

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

    console.log(parsed.data);
    const normalized = mapApiItemToDomain(parsed.data);
    item = await upsertItem(normalized);
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
  try {
    const { id, usedIn, recycleFrom, recycleComponents, components } =
      ApiDataItem;
    const {
      toPrismaCreateItem,
      toPrismaCreateComponent,
      toPrismaUpsertItem,
      toPrismaDeleteAndUpsertComponent,
    } = itemMapper;

    if (process.env.NODE_ENV !== "production") {
      console.log("inserting...", id);
    }

    const createData = {
      ...toPrismaCreateItem(ApiDataItem),
      usedIn: toPrismaCreateComponent(usedIn),
      recycleFrom: toPrismaCreateComponent(recycleFrom),
      recycleComponents: toPrismaCreateComponent(recycleComponents),
      components: toPrismaCreateComponent(components),
    };

    const updateData = {
      ...toPrismaUpsertItem(ApiDataItem),
      usedIn: toPrismaDeleteAndUpsertComponent(id, usedIn),
      recycleFrom: toPrismaDeleteAndUpsertComponent(id, recycleFrom),
      recycleComponents: toPrismaDeleteAndUpsertComponent(
        id,
        recycleComponents,
      ),
      components: toPrismaDeleteAndUpsertComponent(id, components),
    };

    const item = await upsertItemRecord(id, createData, updateData);

    if (process.env.NODE_ENV !== "production") {
      console.log(`Successfully inserted ${ApiDataItem.id}`);
    }
    return item;
  } catch (e) {
    console.error(`Failed to insert item:`, e);
    return null;
  }
}

const STALE_TIME_DAYS = 7;
function isStale(lastFetched: Date) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - STALE_TIME_DAYS);

  return lastFetched < currentDate ? true : false;
}
