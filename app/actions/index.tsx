import * as z from "zod";
import { RawItemSchema } from "@/app/lib/items/item.schema";

import { result } from "@/app/data";

export async function getItem(id: string) {
  try {
    const raw = RawItemSchema.parse(result.data.find((item) => item.id === id));
    return raw;
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation errors:", err);
    }
    return null;
  }
}
