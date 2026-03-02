import { prisma } from "@/app/lib/prisma";
import {
  mapCreateItemData,
  mapUpsertItemData,
  mapCreateComponentData,
  mapDeleteAndUpsertComponentData,
} from "@/app/utils/dataFromApi";
import { BaseItemSchema } from "./item.schema";
import { Item } from "@/app/types";

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

  // let item;
  // look up item in the db
  const selectItem = selectItemFields();
  const selectComponent = selectComponentFields();
  // item = await prisma.item.findUnique({
  //   where: { id },
  //   include: {
  //     // TODO: fix this because sometimes the data comes in as 0 or "" or "Medium, Light" (looting-mk-3-survivor)
  //     stat_block: true,
  //     used_in: { ...selectItem },
  //     // components: { ...selectComponent },
  //     // recycle_components: { ...selectComponent },
  //     // recycle_from: { ...selectItem },
  //   },
  // });

  const item = Object.values(items).find((item) => item.id === id);
  const parsed = BaseItemSchema.safeParse(item);
  const dbItem = await upsertItem(parsed.data as unknown as Item);

  // console.log(dbItem);
  // if (item) {
  //   await prisma.item.create({
  //     data: {
  //       ...mapCreateItemData(item),
  //       recycle_from: mapCreateComponentData(item.recycle_from)
  //     }
  //   })
  // // await upsertItem(item as unknown as ApiDataItem);
  // }

  // console.log(item);
  // if (!item) {
  //   item = Object.values(items).find((item) => item.id === id);
  //   await upsertItem(item as unknown as ApiDataItem);
  // } else if (item && isStale(item.last_fetched)) {
  //   item = await upsertItem(item as unknown as ApiDataItem);
  // }

  // const parsed = BaseItemSchema.safeParse(item);
  // console.log(parsed);
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

export default async function upsertItem(ApiDataItem: Item) {
  try {
    const { id, usedIn, recycleFrom, recycleComponents, components } =
      ApiDataItem;

    console.log(ApiDataItem);
    console.log("inserting...", id);
    const item = await prisma.item.upsert({
      where: { id },
      create: {
        ...mapCreateItemData(ApiDataItem),
        usedIn: mapCreateComponentData(usedIn),
        recycleFrom: mapCreateComponentData(recycleFrom),
        // recycleComponents: mapCreateComponentData(recycleComponents),
        // components: mapCreateComponentData(components),
      },
      update: {
        ...mapUpsertItemData(ApiDataItem),
        usedIn: mapDeleteAndUpsertComponentData(id, usedIn),
        recycleFrom: mapDeleteAndUpsertComponentData(id, recycleFrom),
        // recycleComponents: mapDeleteAndUpsertComponentData(
        //   id,
        //   recycleComponents,
        // ),
        // components: mapDeleteAndUpsertComponentData(id, components),
      },
      include: {
        usedIn: selectComponentFields(),
      },
    });
    console.log(`Successfully inserted ${ApiDataItem.id}`);
    return item;
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
          itemType: true,
          description: true,
        },
      },
    },
  };
}

function selectItemFields() {
  return {
    include: {
      component: {
        select: {
          id: true,
          icon: true,
          name: true,
          rarity: true,
          itemType: true,
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
