/*
  Warnings:

  - Made the column `description` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "value" INTEGER,
    "workbench" TEXT,
    "flavorText" TEXT,
    "subcategory" TEXT,
    "shieldType" TEXT,
    "lootArea" TEXT,
    "sources" TEXT,
    "ammoType" TEXT,
    "createdAtApi" DATETIME,
    "updatedAtApi" DATETIME,
    "lastFetched" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Item" ("ammoType", "createdAt", "createdAtApi", "description", "flavorText", "icon", "id", "itemType", "lastFetched", "lootArea", "name", "rarity", "shieldType", "sources", "subcategory", "updatedAt", "updatedAtApi", "value", "workbench") SELECT "ammoType", "createdAt", "createdAtApi", "description", "flavorText", "icon", "id", "itemType", "lastFetched", "lootArea", "name", "rarity", "shieldType", "sources", "subcategory", "updatedAt", "updatedAtApi", "value", "workbench" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_itemType_idx" ON "Item"("itemType");
CREATE INDEX "Item_rarity_idx" ON "Item"("rarity");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
