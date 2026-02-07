import { z } from "zod";

import { Item } from "@/app/lib/items/item.types";
import { RarityType } from "@/app/types";

const ComponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  rarity: z
    .enum(["Common", "Uncommon", "Rare", "Epic", "Legendary"])
    .transform((rarity) => rarity.toLowerCase() as RarityType),
  item_type: z.string(),
  description: z.string(),
});

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
    recycle_components: z.array(ComponentSchema).optional(),
    recycle_from: z.array(ComponentSchema).optional(),
    used_in: z.array(ComponentSchema).optional(),
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
        recycleComponents: raw.recycle_components?.map((component) => ({
          id: component.id,
          name: component.name,
          icon: component.icon,
          rarity: component.rarity,
          itemType: component.item_type,
          description: component.description,
        })),
        recycleFrom: raw.recycle_from?.map((component) => ({
          id: component.id,
          name: component.name,
          icon: component.icon,
          rarity: component.rarity,
          itemType: component.item_type,
          description: component.description,
        })),
        usedIn: raw.used_in?.map((component) => ({
          id: component.id,
          name: component.name,
          icon: component.icon,
          rarity: component.rarity,
          itemType: component.item_type,
          description: component.description,
        })),
      }) satisfies Item,
  );
