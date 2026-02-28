import { prisma } from "@/app/lib/prisma";
import {
  mapCreateItemData,
  mapUpsertItemData,
  mapCreateComponentData,
  mapDeleteAndUpsertComponentData,
} from "@/app/utils/dataFromApi";
import { BaseItemSchema } from "./item.schema";
import { Item, ApiDataItem } from "@/app/types";

import * as items from "@/app/data";

export async function getItem(id: string): Promise<Item | null> {
  // const res = await fetch(
  //   `https://metaforge.app/api/arc-raiders/items?id=${id}&includeComponents=true`,
  //   {
  //     cache: "force-cache",
  //     next: {
  //       revalidate: 60 * 60,
  //     },
  //   },
  // );

  // if (!res.ok) {
  //   console.error("Failed to fetch item:", res.statusText);
  //   return null;
  // }

  // const data = (await res.json()).data[0];
  // console.log(data);
  // const parsed = BaseItemSchema.safeParse(data);
  // console.log(parsed);
  // if (!parsed.success) {
  //   console.error(
  //     "Validation errors:",
  //     parsed.error.issues.map((issue) => issue.message),
  //   );
  //   return null;
  // }
  // console.log(parsed.data);
  // return parsed.data;

  let item;
  // look up item in the db
  const selectItem = selectItemFields();
  const selectComponent = selectComponentFields();
  item = await prisma.item.findUnique({
    where: { id },
    include: {
      // TODO: fix this because sometimes the data comes in as 0 or "" or "Medium, Light" (looting-mk-3-survivor)
      stat_block: true,
      components: { ...selectComponent },
      used_in: { ...selectItem },
      recycle_components: { ...selectComponent },
      recycle_from: { ...selectItem },
    },
  });
  console.log(item);
  if (!item) {
    item = Object.values(items).find((item) => item.id === id);
    await upsertItem(item as unknown as ApiDataItem);
  } else if (item && isStale(item.last_fetched)) {
    item = await upsertItem(item as unknown as ApiDataItem);
  }

  const parsed = BaseItemSchema.safeParse(item);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      // console.log(parsed);
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

export default async function upsertItem(ApiDataItem: ApiDataItem) {
  try {
    const { id, used_in, recycle_from, recycle_components, components } =
      ApiDataItem;

    console.log("inserting...", id);

    await prisma.item.upsert({
      where: { id },
      create: {
        ...mapCreateItemData(ApiDataItem),
        used_in: mapCreateComponentData(used_in),
        recycle_from: mapCreateComponentData(recycle_from),
        recycle_components: mapCreateComponentData(recycle_components),
        components: mapCreateComponentData(components),
      },
      update: {
        ...mapUpsertItemData(ApiDataItem),
        used_in: mapDeleteAndUpsertComponentData(id, used_in),
        recycle_from: mapDeleteAndUpsertComponentData(id, recycle_from),
        recycle_components: mapDeleteAndUpsertComponentData(
          id,
          recycle_components,
        ),
        components: mapDeleteAndUpsertComponentData(id, components ?? []),
      },
    });
    console.log(`Successfully inserted ${ApiDataItem.id}`);
  } catch (e) {
    console.error(`Failed to insert item ${ApiDataItem.id}:`, e);
  }
}

function selectComponentFields() {
  return {
    include: {
      component: {
        select: {
          id: true,
          icon: true,
          name: true,
          rarity: true,
          item_type: true,
          description: true,
        },
      },
    },
  };
}

function selectItemFields() {
  return {
    include: {
      item: {
        select: {
          id: true,
          icon: true,
          name: true,
          rarity: true,
          item_type: true,
          description: true,
        },
      },
    },
  };
}

const STALE_TIME_DAYS = 7;
function isStale(lastFetched: Date) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - STALE_TIME_DAYS);

  return lastFetched < currentDate ? true : false;
}
