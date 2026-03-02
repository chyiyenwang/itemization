import { ApiDataItem, ApiDataComponent, ApiBaseComponent } from "@/app/types";

export function normalizeData(data: ApiDataComponent[]) {
  return data.map((c) => {
    return {
      quantity: c.quantity,
      component: (c.item ?? c.component) as ApiBaseComponent,
    };
  });
}

export function mapCreateItemData(item: ApiDataItem) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.item_type,
    icon: item.icon,
    rarity: item.rarity,
    value: item.value,
    workbench: item.workbench,
    statBlock: {
      create: { ...item.stat_block },
    },
    flavorText: item.flavor_text,
    subcategory: item.subcategory,
    createdAtApi: item.created_at,
    updatedAtApi: item.updated_at,
    shieldType: item.shield_type,
    lootArea: item.loot_area,
    sources: item.sources,
    ammoType: item.ammo_type,
  };
}

export function mapUpsertItemData(item: ApiDataItem) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.item_type,
    icon: item.icon,
    rarity: item.rarity,
    value: item.value,
    workbench: item.workbench,
    statBlock: {
      upsert: {
        where: { itemId: item.id },
        create: { ...item.stat_block },
        update: { ...item.stat_block },
      },
    },
    flavorText: item.flavor_text,
    subcategory: item.subcategory,
    createdAtApi: item.created_at,
    updatedAtApi: item.updated_at,
    shieldType: item.shield_type,
    lootArea: item.loot_area,
    sources: item.sources,
    ammoType: item.ammo_type,
  };
}

export function mapCreateComponentData(data: ApiDataComponent[]) {
  const normalized = normalizeData(data);

  return {
    create: normalized.map((c) => {
      return {
        quantity: c.quantity,
        component: {
          create: {
            id: c.component.id,
            name: c.component.name,
            description: c.component.description,
            itemType: c.component.item_type,
            icon: c.component.icon,
            rarity: c.component.rarity,
          },
        },
      };
    }),
  };
}

export function mapDeleteAndUpsertComponentData(
  id: string,
  data: ApiDataComponent[],
) {
  const normalized = normalizeData(data);

  return {
    deleteMany: {
      componentId: {
        notIn: normalized.map((c) => c.component.id),
      },
    },
    upsert: normalized.map((comp) => {
      return {
        where: {
          itemId_componentId: {
            itemId: id,
            componentId: comp.component.id,
          },
        },
        update: {
          quantity: comp.quantity,
          component: {
            update: {
              name: comp.component.name,
              description: comp.component.description,
              itemType: comp.component.item_type,
              icon: comp.component.icon,
              rarity: comp.component.rarity,
            },
          },
        },
        create: {
          quantity: comp.quantity,
          component: {
            connectOrCreate: {
              where: { id: comp.component.id },
              create: {
                id: comp.component.id,
                name: comp.component.name,
                description: comp.component.description,
                itemType: comp.component.item_type,
                icon: comp.component.icon,
                rarity: comp.component.rarity,
              },
            },
          },
        },
      };
    }),
  };
}
