import { z } from "zod";

import { Item } from "@/app/lib/items/item.types";
import { RarityType } from "@/app/types";

const CapitalizedRarity = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

const ChildBaseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  rarity: z
    .enum(CapitalizedRarity)
    .transform((rarity) => rarity.toLowerCase() as RarityType),
  item_type: z.string(),
  description: z.string().optional(),
});

const ChildItemSchema = z.object({
  item: ChildBaseItemSchema,
  quantity: z.number(),
});

const ComponentItemSchema = z.object({
  component: ChildBaseItemSchema,
  quantity: z.number(),
});

export const BaseItemSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    loot_area: z.string().nullable(),
    rarity: z
      .enum(CapitalizedRarity)
      .transform((rarity) => rarity.toLowerCase() as RarityType),
    icon: z.string(),
    item_type: z.string(),
    value: z.number(),
    stat_block: z.object({
      weight: z.number(),
      stackSize: z.number(),
    }),
    components: z.array(ComponentItemSchema).optional(),
    used_in: z.array(ChildItemSchema).optional(),
    recycle_components: z.array(ComponentItemSchema).optional(),
    recycle_from: z.array(ChildItemSchema).optional(),
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
        components: raw.components?.map((component) => ({
          component: {
            id: component.component.id,
            name: component.component.name,
            icon: component.component.icon,
            rarity: component.component.rarity,
            itemType: component.component.item_type,
            description: component.component.description,
          },
          quantity: component.quantity,
        })),
        usedIn: raw.used_in?.map((component) => ({
          component: {
            id: component.item.id,
            name: component.item.name,
            icon: component.item.icon,
            rarity: component.item.rarity,
            itemType: component.item.item_type,
            description: component.item.description,
          },
          quantity: component?.quantity,
        })),
        recycleComponents: raw.recycle_components?.map((component) => ({
          component: {
            id: component.component.id,
            name: component.component.name,
            icon: component.component.icon,
            rarity: component.component.rarity,
            itemType: component.component.item_type,
            description: component.component.description,
          },
          quantity: component.quantity,
        })),
        recycleFrom: raw.recycle_from?.map((component) => ({
          component: {
            id: component.item.id,
            name: component.item.name,
            icon: component.item.icon,
            rarity: component.item.rarity,
            itemType: component.item.item_type,
            description: component.item.description,
          },
          quantity: component.quantity,
        })),
      }) satisfies Item,
  );
