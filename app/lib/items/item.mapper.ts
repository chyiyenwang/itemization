import { ApiItem } from "./item.schema";
import { RarityType } from "@/app/types";

export function mapApiItemToDomain(raw: ApiItem) {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    lootArea: raw.loot_area,
    rarity: raw.rarity.toLowerCase() as RarityType,
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
      raw.components.map((c) => ({
        component: {
          id: c.component.id,
          name: c.component.name,
          icon: c.component.icon,
          rarity: c.component.rarity.toLowerCase() as RarityType,
          itemType: c.component.item_type,
          description: c.component.description ?? "",
        },
        quantity: c.quantity,
      })) || [],
    usedIn:
      raw.used_in.map((c) => ({
        component: {
          id: c.item.id,
          name: c.item.name,
          icon: c.item.icon,
          rarity: c.item.rarity.toLowerCase() as RarityType,
          itemType: c.item.item_type,
          description: c.item.description ?? "",
        },
        quantity: c.quantity,
      })) || [],
    recycleComponents:
      raw.recycle_components.map((c) => ({
        component: {
          id: c.component.id,
          name: c.component.name,
          icon: c.component.icon,
          rarity: c.component.rarity.toLowerCase() as RarityType,
          itemType: c.component.item_type,
          description: c.component.description ?? "",
        },
        quantity: c.quantity,
      })) || [],
    recycleFrom:
      raw.recycle_from.map((c) => ({
        component: {
          id: c.item.id,
          name: c.item.name,
          icon: c.item.icon,
          rarity: c.item.rarity.toLowerCase() as RarityType,
          itemType: c.item.item_type,
          description: c.item.description ?? "",
        },
        quantity: 0,
      })) || [],
    createdAtApi: raw.created_at,
    updatedAtApi: raw.updated_at,
  };
}
