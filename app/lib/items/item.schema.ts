import { z } from "zod";

import { Item } from "@/app/lib/items/item.types";
import { RarityType } from "@/app/types";

export const ItemSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    loot_area: z.string().nullable(),
    rarity: z
      .enum(["Common", "Uncommon", "Rare", "Epic", "Legendary"])
      .transform((rarity) => rarity.toLowerCase() as RarityType),
    icon: z.string(),
    item_type: z.string(),
    value: z.number(),
    stat_block: z.object({
      weight: z.number(),
      stackSize: z.number(),
    }),
    recycle_components: z.array(z.object({})),
    recycle_from: z.array(z.object({})),
    used_in: z.array(z.object({})),
  })
  .transform(
    (raw) =>
      ({
        id: raw.id,
        name: raw.name,
        description: raw.description,
        lootArea: raw.loot_area,
        rarity: raw.rarity,
        icon: raw.icon,
        itemType: raw.item_type,
        value: raw.value,
        statBlock: {
          weight: raw.stat_block.weight,
          stackSize: raw.stat_block.stackSize,
        },
      }) satisfies Item,
  );

// {
//   "id": "metal-parts",
//   "icon": "https://cdn.metaforge.app/arc-raiders/icons/metal-parts.webp",
//   "name": "Metal Parts",
//   "rarity": "Common",
//   "item_type": "Basic Material",
//   "description": "Used to craft a wide range of items."
// }
