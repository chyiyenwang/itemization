-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemComponent" ("componentId", "id", "itemId", "quantity") SELECT "componentId", "id", "itemId", "quantity" FROM "ItemComponent";
DROP TABLE "ItemComponent";
ALTER TABLE "new_ItemComponent" RENAME TO "ItemComponent";
CREATE UNIQUE INDEX "ItemComponent_itemId_componentId_key" ON "ItemComponent"("itemId", "componentId");
CREATE TABLE "new_ItemRecycleComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemRecycleComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecycleComponent" ("componentId", "id", "itemId", "quantity") SELECT "componentId", "id", "itemId", "quantity" FROM "ItemRecycleComponent";
DROP TABLE "ItemRecycleComponent";
ALTER TABLE "new_ItemRecycleComponent" RENAME TO "ItemRecycleComponent";
CREATE UNIQUE INDEX "ItemRecycleComponent_itemId_componentId_key" ON "ItemRecycleComponent"("itemId", "componentId");
CREATE TABLE "new_ItemRecycleFrom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleFrom_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemRecycleFrom_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecycleFrom" ("componentId", "id", "itemId", "quantity") SELECT "componentId", "id", "itemId", "quantity" FROM "ItemRecycleFrom";
DROP TABLE "ItemRecycleFrom";
ALTER TABLE "new_ItemRecycleFrom" RENAME TO "ItemRecycleFrom";
CREATE UNIQUE INDEX "ItemRecycleFrom_itemId_componentId_key" ON "ItemRecycleFrom"("itemId", "componentId");
CREATE TABLE "new_ItemUsedIn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemUsedIn_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemUsedIn_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemUsedIn" ("componentId", "id", "itemId", "quantity") SELECT "componentId", "id", "itemId", "quantity" FROM "ItemUsedIn";
DROP TABLE "ItemUsedIn";
ALTER TABLE "new_ItemUsedIn" RENAME TO "ItemUsedIn";
CREATE UNIQUE INDEX "ItemUsedIn_itemId_componentId_key" ON "ItemUsedIn"("itemId", "componentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
