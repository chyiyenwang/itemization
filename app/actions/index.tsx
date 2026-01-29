import * as z from "zod";

import { result } from "@/app/data";

const RawItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  loot_area: z.string(),
  rarity: z.enum(["Common", "Uncommon", "rare", "Epic", "Legendary"]),
  icon: z.string(),
  item_type: z.string(),
  value: z.number(),
  stat_block: z.object({
    weight: z.number(),
    stackSize: z.number(),
  }),
}).transform((raw) => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  lootArea: raw.loot_area,
  rarity: raw.rarity.toLowerCase(),
  icon: raw.icon,
  itemType: raw.item_type,
  value: raw.value,
  statBlock: {
    weight: raw.stat_block.weight,
    stackSize: raw.stat_block.stackSize,
  },
}));

export async function getItem(id: string) {
  // const data = await fetch(`https://metaforge.app/api/arc-raiders/items?id=${id}&includeComponents=true`, {
  //   cache: 'force-cache',
  //   next: {
  //     revalidate: 60 * 60, // 1 hour
  //   },
  // });
  // return await data.json();
  try {
    const raw = RawItemSchema.parse(result.data[0]);
    console.log(raw);
    return raw;
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation errors:", err);
    }
    return null;
  }
};