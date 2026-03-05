import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function findUniqueItem(id: string) {
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
