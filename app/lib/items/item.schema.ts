import { z } from "zod";

import { RarityType, Item } from "@/app/types";

const CapitalizedRarity = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

const ChildItemBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  rarity: z
    .enum(CapitalizedRarity)
    .transform((rarity) => rarity.toLowerCase() as RarityType),
  item_type: z.string(),
  description: z.string().optional(),
});

// used_in && recycle_from
const ChildItemSchema = z.object({
  item: ChildItemBaseSchema,
  quantity: z.number(),
});

// components && recycle_components
const ChildComponentSchema = z.object({
  component: ChildItemBaseSchema,
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
    workbench: z
      .string()
      .nullish()
      .transform((val) => val ?? undefined),
    flavor_text: z
      .string()
      .nullish()
      .transform((val) => val ?? undefined),
    subcategory: z
      .string()
      .nullish()
      .transform((val) => val ?? undefined),
    shield_type: z
      .string()
      .nullish()
      .transform((val) => val ?? undefined),
    sources: z
      .string()
      .nullish()
      .transform((val) => val ?? undefined),
    ammo_type: z
      .string()
      .nullish()
      .transform((val) => val ?? undefined),
    stat_block: z.object({
      weight: z.number(),
      stackSize: z.number(),
      range: z.number().optional(),
      damage: z.number().optional(),
      health: z.number().optional(),
      radius: z.number().optional(),
      shield: z.number().optional(),
      agility: z.number().optional(),
      arcStun: z.number().optional(),
      healing: z.number().optional(),
      stamina: z.number().optional(),
      stealth: z.number().optional(),
      useTime: z.number().optional(),
      duration: z.number().optional(),
      fireRate: z.number().optional(),
      stability: z.number().optional(),
      damageMult: z.number().optional(),
      raiderStun: z.number().optional(),
      weightLimit: z.number().optional(),
      augmentSlots: z.number().optional(),
      healingSlots: z.number().optional(),
      magazineSize: z.number().optional(),
      reducedNoise: z.number().optional(),
      shieldCharge: z.number().optional(),
      backpackSlots: z.number().optional(),
      quickUseSlots: z.number().optional(),
      damagePerSecond: z.number().optional(),
      movementPenalty: z.number().optional(),
      safePocketSlots: z.number().optional(),
      damageMitigation: z.number().optional(),
      healingPerSecond: z.number().optional(),
      reducedEquipTime: z.number().optional(),
      staminaPerSecond: z.number().optional(),
      increasedADSSpeed: z.number().optional(),
      increasedFireRate: z.number().optional(),
      reducedReloadTime: z.number().optional(),
      illuminationRadius: z.number().optional(),
      increasedEquipTime: z.number().optional(),
      reducedUnequipTime: z.number().optional(),
      shieldCompatibility: z
        .union([z.string(), z.number()])
        .optional()
        .transform((val) => (val !== 0 ? val : "")),
      increasedUnequipTime: z.number().optional(),
      reducedVerticalRecoil: z.number().optional(),
      increasedBulletVelocity: z.number().optional(),
      increasedVerticalRecoil: z.number().optional(),
      reducedMaxShotDispersion: z.number().optional(),
      reducedPerShotDispersion: z.number().optional(),
      reducedDurabilityBurnRate: z.number().optional(),
      reducedRecoilRecoveryTime: z.number().optional(),
      increasedRecoilRecoveryTime: z.number().optional(),
      reducedDispersionRecoveryTime: z.number().optional(),
    }),
    components: z.array(ChildComponentSchema).optional(),
    used_in: z.array(ChildItemSchema).optional(),
    recycle_components: z.array(ChildComponentSchema).optional(),
    recycle_from: z.array(ChildItemSchema).optional(),
    created_at: z.iso.datetime({ offset: true }).pipe(z.coerce.date()),
    updated_at: z.iso.datetime({ offset: true }).pipe(z.coerce.date()),
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
        statBlock: { ...raw.stat_block },
        workbench: raw.workbench,
        flavorText: raw.flavor_text,
        subcategory: raw.subcategory,
        shieldType: raw.shield_type,
        sources: raw.sources,
        ammoType: raw.ammo_type,
        components:
          raw.components?.map((component) => ({
            component: {
              id: component.component.id,
              name: component.component.name,
              icon: component.component.icon,
              rarity: component.component.rarity,
              itemType: component.component.item_type,
              description: component.component.description,
            },
            quantity: component.quantity,
          })) || [],
        usedIn:
          raw.used_in?.map((component) => ({
            component: {
              id: component.item.id,
              name: component.item.name,
              icon: component.item.icon,
              rarity: component.item.rarity,
              itemType: component.item.item_type,
              description: component.item.description,
            },
            quantity: component.quantity,
          })) || [],
        recycleComponents:
          raw.recycle_components?.map((component) => ({
            component: {
              id: component.component.id,
              name: component.component.name,
              icon: component.component.icon,
              rarity: component.component.rarity,
              itemType: component.component.item_type,
              description: component.component.description,
            },
            quantity: component.quantity,
          })) || [],
        recycleFrom:
          raw.recycle_from?.map((component) => ({
            component: {
              id: component.item.id,
              name: component.item.name,
              icon: component.item.icon,
              rarity: component.item.rarity,
              itemType: component.item.item_type,
              description: component.item.description,
            },
            quantity: 0,
          })) || [],
        createdAtApi: raw.created_at,
        updatedAtApi: raw.updated_at,
      }) satisfies Item,
  );
