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
    item_type: item.item_type,
    icon: item.icon,
    rarity: item.rarity,
    value: item.value,
    workbench: item.workbench,
    stat_block: {
      create: { ...item.stat_block },
    },
    flavor_text: item.flavor_text,
    subcategory: item.subcategory,
    created_at_api: item.created_at,
    updated_at_api: item.updated_at,
    shield_type: item.shield_type,
    loot_area: item.loot_area,
    sources: item.sources,
    ammo_type: item.ammo_type,
  };
}

export function mapUpsertItemData(item: ApiDataItem) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    item_type: item.item_type,
    icon: item.icon,
    rarity: item.rarity,
    value: item.value,
    workbench: item.workbench,
    stat_block: {
      upsert: {
        where: { item_id: item.id },
        create: { ...item.stat_block },
        update: { ...item.stat_block },
      },
    },
    flavor_text: item.flavor_text,
    subcategory: item.subcategory,
    created_at_api: item.created_at,
    updated_at_api: item.updated_at,
    shield_type: item.shield_type,
    loot_area: item.loot_area,
    sources: item.sources,
    ammo_type: item.ammo_type,
  };
}

export function mapCreateComponentData(data: ApiDataComponent[]) {
  const normalized = normalizeData(data);

  return {
    create: normalized.map((c) => {
      return {
        quantity: c.quantity,
        main_item: {
          create: {
            id: c.component.id,
            name: c.component.name,
            description: c.component.description,
            item_type: c.component.item_type,
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
      component_id: {
        notIn: normalized.map((c) => c.component.id),
      },
    },
    upsert: normalized.map((comp) => {
      return {
        where: {
          item_id_component_id: {
            item_id: id,
            component_id: comp.component.id,
          },
        },
        update: {
          quantity: comp.quantity,
          main_item: {
            update: {
              id: comp.component.id,
              name: comp.component.name,
              description: comp.component.description,
              item_type: comp.component.item_type,
              icon: comp.component.icon,
              rarity: comp.component.rarity,
            },
          },
        },
        create: {
          quantity: comp.quantity,
          main_item: {
            create: {
              id: comp.component.id,
              name: comp.component.name,
              description: comp.component.description,
              item_type: comp.component.item_type,
              icon: comp.component.icon,
              rarity: comp.component.rarity,
            },
          },
        },
      };
    }),
  };
}
