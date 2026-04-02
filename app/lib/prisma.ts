import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const pool = {
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const adapter = new PrismaPg(pool);

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
