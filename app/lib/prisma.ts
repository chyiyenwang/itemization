import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
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
