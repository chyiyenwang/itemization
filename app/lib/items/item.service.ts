import * as z from "zod";
import { BaseItemSchema } from "./item.schema";
import type { Item } from "./item.types";

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

  const res = Object.values(items).find((item) => item.id === id);
  if (!res) return null;
  console.log(res);
  const parsed = BaseItemSchema.safeParse(res);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Validation errors:",
        parsed.error.issues.map((issue) => issue.message),
      );
    }
    return null;
  }

  return parsed.data;
}
