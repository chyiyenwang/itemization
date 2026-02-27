import { prisma } from "@/app/db/prisma";
import { ApiDataItem, ApiDataComponent, ApiBaseComponent } from "@/app/types";

function normalizeData(data: ApiDataComponent[]) {
  return data.map((c) => {
    return {
      quantity: c.quantity,
      component: (c.item ?? c.component) as ApiBaseComponent,
    };
  });
}

function mapCreateItemData(item: ApiDataItem) {
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

function mapUpsertItemData(item: ApiDataItem) {
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

function mapCreateComponentData(data: ApiDataComponent[]) {
  const normalized = normalizeData(data);
  console.log(normalized);
  return {
    createMany: {
      data: normalized.map((c) => {
        return {
          component_id: c.component.id,
          quantity: c.quantity,
        };
      }),
    },
  };
}

function mapDeleteAndUpsertComponentData(id: string, data: ApiDataComponent[]) {
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
        update: { quantity: comp.quantity },
        create: {
          component_id: comp.component.id,
          quantity: comp.quantity,
        },
      };
    }),
  };
}

export default async function dataFromApi(ApiDataItem: ApiDataItem) {
  try {
    const { id, used_in, recycle_from, recycle_components, components } =
      ApiDataItem;
    console.log("inserting...", id);
    await prisma.item.upsert({
      where: { id },
      create: {
        ...mapCreateItemData(ApiDataItem),
        used_in: mapCreateComponentData(used_in),
        recycle_from: mapCreateComponentData(recycle_from),
        recycle_components: mapCreateComponentData(recycle_components),
        components: mapCreateComponentData(components),
      },
      update: {
        ...mapUpsertItemData(ApiDataItem),
        used_in: mapDeleteAndUpsertComponentData(id, used_in),
        recycle_from: mapDeleteAndUpsertComponentData(id, recycle_from),
        recycle_components: mapDeleteAndUpsertComponentData(
          id,
          recycle_components,
        ),
        components: mapDeleteAndUpsertComponentData(id, components ?? []),
      },
    });
    console.log(`Successfully inserted ${ApiDataItem.id}`);
  } catch (e) {
    console.error(`Failed to insert item ${ApiDataItem.id}:`, e);
  }
}
