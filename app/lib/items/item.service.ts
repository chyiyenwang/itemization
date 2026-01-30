import * as z from "zod";
import { ItemSchema } from "./item.schema";
import type { Item } from "./item.types";

import { result } from "@/app/data";

export async function getItem(id: string): Promise<Item | null> {
  // const res = await fetch(`https://metaforge.app/api/arc-raiders/items?id=${id}&includeComponents=true`, {
  //   cache: 'force-cache',
  //   next: {
  //     revalidate: 60 * 60,
  //   },
  // });

  // if (!res.ok) {
  //   console.error("Failed to fetch item:", res.statusText);
  //   return null;
  // }

  // const data = (await res.json()).data[0];
  // const parsed = ItemSchema.safeParse(data);

  // if (!parsed.success) {
  //   console.error("Validation errors:", parsed.error.issues.map((issue) => issue.message));
  //   return null;
  // }

  // return parsed.data;

  const res = result.data.find((item) => item.id === id);
  if (!res) return null;

  const parsed = ItemSchema.safeParse(res);
  if (!parsed.success) {
    console.error(
      "Validation errors:",
      parsed.error.issues.map((issue) => issue.message),
    );
    return null;
  }

  return parsed.data;
}
