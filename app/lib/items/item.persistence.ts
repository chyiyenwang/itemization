import { Component, Item } from "@/app/types";

const itemMapper = {
  toPrismaCreateItem(item: Item) {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      itemType: item.itemType,
      icon: item.icon,
      rarity: item.rarity,
      value: item.value,
      workbench: item.workbench ?? null,
      statBlock: {
        create: { ...item.statBlock },
      },
      flavorText: item.flavorText ?? null,
      subcategory: item.subcategory ?? null,
      createdAtApi: item.createdAtApi ?? null,
      updatedAtApi: item.updatedAtApi ?? null,
      shieldType: item.shieldType ?? null,
      lootArea: item.lootArea ?? null,
      sources: item.sources ?? null,
      ammoType: item.ammoType ?? null,
    };
  },

  toPrismaCreateComponent(components: Component[]) {
    return {
      create: components.map((c) => {
        return {
          quantity: c.quantity,
          component: {
            connectOrCreate: {
              where: { id: c.component.id },
              create: {
                id: c.component.id,
                name: c.component.name,
                description: c.component.description,
                itemType: c.component.itemType,
                icon: c.component.icon,
                rarity: c.component.rarity,
              },
            },
          },
        };
      }),
    };
  },

  toPrismaUpsertItem(item: Item) {
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
      createdAtApi: item.createdAtApi,
      updatedAtApi: item.updatedAtApi,
      shieldType: item.shieldType,
      lootArea: item.lootArea,
      sources: item.sources,
      ammoType: item.ammoType,
      lastFetched: new Date(),
    };
  },

  toPrismaDeleteAndUpsertComponent(id: string, components: Component[]) {
    return {
      deleteMany: {
        componentId: {
          notIn: components.map((c) => c.component.id),
        },
      },
      upsert: components.map((comp) => {
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
  },
};

export const inputBuilder = {
  createInput(item: Item) {
    const { usedIn, recycleFrom, recycleComponents, components } = item;
    const { toPrismaCreateItem, toPrismaCreateComponent } = itemMapper;
    return {
      ...toPrismaCreateItem(item),
      usedIn: toPrismaCreateComponent(usedIn),
      recycleFrom: toPrismaCreateComponent(recycleFrom),
      recycleComponents: toPrismaCreateComponent(recycleComponents),
      components: toPrismaCreateComponent(components),
    };
  },

  updateInput(item: Item) {
    const { id, usedIn, recycleFrom, recycleComponents, components } = item;
    const { toPrismaUpsertItem, toPrismaDeleteAndUpsertComponent } = itemMapper;
    return {
      ...toPrismaUpsertItem(item),
      usedIn: toPrismaDeleteAndUpsertComponent(id, usedIn),
      recycleFrom: toPrismaDeleteAndUpsertComponent(id, recycleFrom),
      recycleComponents: toPrismaDeleteAndUpsertComponent(
        id,
        recycleComponents,
      ),
      components: toPrismaDeleteAndUpsertComponent(id, components),
    };
  },
};
