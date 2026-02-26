import { prisma } from "../lib/prisma";

function mapCreateItemData(item: any) {
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

function mapUpsertItemData(item: any) {
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

function mapCreateComponentData(data: any[]) {
  return {
    createMany: {
      data: data.map((c) => {
        const compId = c.item?.id ?? c.component.id;
        return {
          component_id: compId,
          quantity: c.quantity,
        };
      }),
    },
  };
}

function mapDeleteAndUpsertComponentData(id: string, data: any[]) {
  return {
    deleteMany: {
      component_id: {
        notIn: data.map((c) => c.item?.id ?? c.component.id),
      },
    },
    upsert: data.map((comp) => {
      const compId = comp.item?.id ?? comp.component.id;
      return {
        where: {
          item_id_component_id: {
            item_id: id,
            component_id: compId,
          },
        },
        update: { quantity: comp.quantity },
        create: {
          component_id: compId,
          quantity: comp.quantity,
        },
      };
    }),
  };
}

export default async function dataFromApi(ApiDataItem: any) {
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
        components: mapDeleteAndUpsertComponentData(id, components),
      },
    });
    console.log(`Successfully inserted ${ApiDataItem.id}`);
  } catch (e) {
    console.error(`Failed to insert item ${ApiDataItem.id}:`, e);
  }
}
