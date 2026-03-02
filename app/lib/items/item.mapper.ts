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
      createdAtApi: item.createdAt,
      updatedAtApi: item.updatedAt,
      shieldType: item.shieldType,
      lootArea: item.lootArea,
      sources: item.sources,
      ammoType: item.ammoType,
    };
  },

  toPrismaCreateComponent(data: Component[]) {
    return {
      create: data.map((c) => {
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
  },

  toPrismaDeleteAndUpsertComponent(id: string, data: Component[]) {
    return {
      deleteMany: {
        componentId: {
          notIn: data.map((c) => c.component.id),
        },
      },
      upsert: data.map((comp) => {
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

export default itemMapper;
