import { prisma } from "../lib/prisma";

export default async function seedDb(item: any) {
  console.log(item.id);
  try {
    await prisma.item.create({
      data: {
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
      },
    });

    for (const comp of item.components ?? []) {
      await prisma.itemComponent.create({
        data: {
          item_id: item.id,
          component_id: comp.component.id,
          quantity: comp.quantity,
        },
      });
    }

    for (const comp of item.recycle_components ?? []) {
      await prisma.itemRecycleComponent.create({
        data: {
          item_id: item.id,
          component_id: comp.component.id,
          quantity: comp.quantity,
        },
      });
    }

    for (const comp of item.recycle_from ?? []) {
      await prisma.itemRecycleFrom.create({
        data: {
          item_id: item.id,
          component_id: comp.component.id,
          quantity: comp.quantity,
        },
      });
    }

    for (const comp of item.used_in ?? []) {
      await prisma.itemUsedIn.create({
        data: {
          item_id: item.id,
          component_id: comp.item.id,
          quantity: comp.quantity,
        },
      });
    }
    console.log(`Successfully inserted ${item.id}`);
  } catch (e) {
    console.error(`Failed to insert item ${item.id}:`, e);
  }
}
