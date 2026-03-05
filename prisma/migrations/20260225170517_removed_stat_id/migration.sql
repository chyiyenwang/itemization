/*
  Warnings:

  - You are about to drop the column `statId` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "workbench" TEXT,
    "flavor_text" TEXT,
    "subcategory" TEXT,
    "shield_type" TEXT,
    "loot_area" TEXT,
    "sources" TEXT,
    "ammo_type" TEXT,
    "created_at_api" DATETIME,
    "updated_at_api" DATETIME,
    "last_fetched" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Item" ("ammo_type", "created_at", "created_at_api", "description", "flavor_text", "icon", "id", "item_type", "last_fetched", "loot_area", "name", "rarity", "shield_type", "sources", "subcategory", "updated_at", "updated_at_api", "value", "workbench") SELECT "ammo_type", "created_at", "created_at_api", "description", "flavor_text", "icon", "id", "item_type", "last_fetched", "loot_area", "name", "rarity", "shield_type", "sources", "subcategory", "updated_at", "updated_at_api", "value", "workbench" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_item_type_idx" ON "Item"("item_type");
CREATE INDEX "Item_rarity_idx" ON "Item"("rarity");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
