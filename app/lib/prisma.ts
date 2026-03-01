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
      item_id: true,
    },
    itemRecycleComponent: {
      id: true,
      item_id: true,
    },
    itemRecycleFrom: {
      id: true,
      item_id: true,
    },
    itemUsedIn: {
      id: true,
      item_id: true,
    },
    stat: {
      id: true,
      item_id: true,
    },
  },
});

export { prisma };
