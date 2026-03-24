import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  omit: {
    itemComponent: {
      id: true,
      itemId: true,
      componentId: true,
    },
    itemRecycleComponent: {
      id: true,
      itemId: true,
      componentId: true,
    },
    itemRecycleFrom: {
      id: true,
      itemId: true,
      componentId: true,
    },
    itemUsedIn: {
      id: true,
      itemId: true,
      componentId: true,
    },
    stat: {
      id: true,
      itemId: true,
    },
  },
});

export { prisma };
