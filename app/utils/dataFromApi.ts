import { prisma } from "../lib/prisma";

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

async function mapComponentData(
  tx: any,
  id: string,
  ApiDataItem: any[],
  table: any,
) {
  for (const comp of ApiDataItem ?? []) {
    await tx[table].upsert({
      where: {
        item_id_component_id: {
          item_id: id,
          component_id: comp.item?.id ?? comp.component.id,
        },
      },
      update: {
        item_id: id,
        component_id: comp.item?.id ?? comp.component.id,
        quantity: comp.quantity,
      },
      create: {
        item_id: id,
        component_id: comp.item?.id ?? comp.component.id,
        quantity: comp.quantity,
      },
    });
  }
}

export default async function dataFromApi(ApiDataItem: any) {
  console.log(ApiDataItem.id);
  try {
    await prisma.$transaction(async (tx) => {
      await tx.item.upsert({
        where: { id: ApiDataItem.id },
        update: mapUpsertItemData(ApiDataItem),
        create: mapCreateItemData(ApiDataItem),
      });

      await mapComponentData(
        tx,
        ApiDataItem.id,
        ApiDataItem.components,
        "itemComponent",
      );
      await mapComponentData(
        tx,
        ApiDataItem.id,
        ApiDataItem.recycle_components,
        "itemRecycleComponent",
      );
      await mapComponentData(
        tx,
        ApiDataItem.id,
        ApiDataItem.recycle_from,
        "itemRecycleFrom",
      );
      await mapComponentData(
        tx,
        ApiDataItem.id,
        ApiDataItem.used_in,
        "itemUsedIn",
      );
    });
    console.log(`Successfully inserted ${ApiDataItem.id}`);
  } catch (e) {
    console.error(`Failed to insert item ${ApiDataItem.id}:`, e);
  }
}
