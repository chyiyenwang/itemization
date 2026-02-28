import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({
  adapter,
  omit: {
    itemComponent: {
      pk_id: true,
      item_id: true,
    },
    itemRecycleComponent: {
      pk_id: true,
      item_id: true,
    },
    itemRecycleFrom: {
      pk_id: true,
      item_id: true,
    },
    itemUsedIn: {
      pk_id: true,
      item_id: true,
    },
    stat: {
      id: true,
      item_id: true,
    },
  },
});

export { prisma };
