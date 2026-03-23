import { inputBuilder } from "./item.persistence";
import {
  findUniqueItem,
  upsertItemRecord,
  findAllItemNames,
} from "./item.repository";
import { mapApiItemToDomain } from "./item.mapper";
import { getRequiredStatBlock, isStale } from "./item.helpers";
import { validateApiItem } from "./item.validation";
import { fetchApiItem } from "./item.api";
import { Item } from "@/app/types";

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

export async function upsertItem(ApiDataItem: Item) {
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

export async function getItemNames(term: string) {
  const res = await findAllItemNames(term);

  if (!res) {
    console.error("No items found");
    return [];
  }

  return res;
}
