import { z } from "zod";

import { Item } from "@/app/lib/items/item.types";

export const RawItemSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    loot_area: z.string(),
    rarity: z.enum(["Common", "Uncommon", "Rare", "Epic", "Legendary"]),
    icon: z.string(),
    item_type: z.string(),
    value: z.number(),
    stat_block: z.object({
      weight: z.number(),
      stackSize: z.number(),
    }),
  })
  .transform(
    (raw) =>
      ({
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
      }) as Item,
  );
