import { Component, Item } from "@/app/types";

export function normalizeData(data: Component[]) {
  console.log(data);
  return data.map((c) => {
    return {
      quantity: c.quantity,
      component: c.component,
    };
  });
}

export function mapCreateItemData(item: Item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    icon: item.icon,
    rarity: item.rarity,
    value: item.value,
    workbench: item.workbench,
    statBlock: {
      create: { ...item.statBlock },
    },
    flavorText: item.flavorText,
    subcategory: item.subcategory,
    createdAtApi: item.createdAt,
    updatedAtApi: item.updatedAt,
    shieldType: item.shieldType,
    lootArea: item.lootArea,
    sources: item.sources,
    ammoType: item.ammoType,
  };
}

export function mapUpsertItemData(item: Item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    icon: item.icon,
    rarity: item.rarity,
    value: item.value,
    workbench: item.workbench,
    statBlock: {
      upsert: {
        where: { itemId: item.id },
        create: { ...item.statBlock },
        update: { ...item.statBlock },
      },
    },
    flavorText: item.flavorText,
    subcategory: item.subcategory,
    createdAtApi: item.createdAt,
    updatedAtApi: item.updatedAt,
    shieldType: item.shieldType,
    lootArea: item.lootArea,
    sources: item.sources,
    ammoType: item.ammoType,
  };
}

export function mapCreateComponentData(data: Component[]) {
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
            itemType: c.component.itemType,
            icon: c.component.icon,
            rarity: c.component.rarity,
          },
        },
      };
    }),
  };
}

export function mapDeleteAndUpsertComponentData(id: string, data: Component[]) {
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
              itemType: comp.component.itemType,
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
                itemType: comp.component.itemType,
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
