import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const result = await prisma.item.findMany({
    include: {
      stat_block: true,
      used_in: {
        include: { item: true },
      },
      components: {
        include: { component: true },
      },
      recycle_components: {
        include: { component: true },
      },
      recycle_from: {
        include: { item: true },
      },
    },
  });
  // console.log(result);
  const safeResult = result.map((row: any) => ({
    ...row,
    value: Number(row.value),
  }));

  return new Response(JSON.stringify(safeResult), {
    headers: { "Content-Type": "application/json" },
  });
}
