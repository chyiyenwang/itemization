import { prisma } from "@/app/lib/prisma";
import itemMapper from "./item.mapper";
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

  let item = await prisma.item.findUnique({
    where: { id },
    include: {
      statBlock: true,
      usedIn: includeComponentDetails,
      components: includeComponentDetails,
      recycleComponents: includeComponentDetails,
      recycleFrom: includeComponentDetails,
    },
  });

  if (!item || isStale(item.lastFetched)) {
    const itemFromApi = Object.values(items).find((item) => item.id === id); // make a request to the API
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

    item = await upsertItem(parsed.data as Item);
  }

  if (!item) {
    console.error(`Could not fetch or upsert item`);
    return null;
  }

  return item as Item;
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

    console.log("inserting...", id);

    const item = await prisma.item.upsert({
      where: { id },
      create: {
        ...toPrismaCreateItem(ApiDataItem),
        usedIn: toPrismaCreateComponent(usedIn),
        recycleFrom: toPrismaCreateComponent(recycleFrom),
        recycleComponents: toPrismaCreateComponent(recycleComponents),
        components: toPrismaCreateComponent(components),
      },
      update: {
        ...toPrismaUpsertItem(ApiDataItem),
        usedIn: toPrismaDeleteAndUpsertComponent(id, usedIn),
        recycleFrom: toPrismaDeleteAndUpsertComponent(id, recycleFrom),
        recycleComponents: toPrismaDeleteAndUpsertComponent(
          id,
          recycleComponents,
        ),
        components: toPrismaDeleteAndUpsertComponent(id, components),
      },
      include: {
        statBlock: true,
        usedIn: includeComponentDetails,
        recycleFrom: includeComponentDetails,
        recycleComponents: includeComponentDetails,
        components: includeComponentDetails,
      },
    });
    console.log(`Successfully inserted ${ApiDataItem.id}`);
    return item;
  } catch (e) {
    console.error(`Failed to insert item:`, e);
    return null;
  }
}

const includeComponentDetails = {
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

const STALE_TIME_DAYS = 7;
function isStale(lastFetched: Date) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - STALE_TIME_DAYS);

  return lastFetched < currentDate ? true : false;
}
