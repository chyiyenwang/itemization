import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function findUniqueItem(id: string) {
  if (!id) return null;

  return await prisma.item.findUnique({
    where: { id },
    include: {
      statBlock: true,
      usedIn: includeComponentDetails,
      components: includeComponentDetails,
      recycleComponents: includeComponentDetails,
      recycleFrom: includeComponentDetails,
    },
  });
}

export async function upsertItemRecord(
  id: string,
  createData: Prisma.ItemCreateInput,
  updateData: Prisma.ItemUpdateInput,
) {
  if (!id) return null;

  return await prisma.item.upsert({
    where: { id },
    create: createData,
    update: updateData,
    include: {
      statBlock: true,
      usedIn: includeComponentDetails,
      recycleFrom: includeComponentDetails,
      recycleComponents: includeComponentDetails,
      components: includeComponentDetails,
    },
  });
}

const includeComponentDetails = {
  include: {
    component: {
      select: {
        id: true,
        icon: true,
        name: true,
        rarity: true,
        itemType: true,
        description: true,
      },
    },
  },
};

export async function findAllItemNames(term: string) {
  if (!term) return [];

  return await prisma.item.findMany({
    where: {
      name: { contains: term },
    },
    select: {
      id: true,
      name: true,
    },
  });
}
