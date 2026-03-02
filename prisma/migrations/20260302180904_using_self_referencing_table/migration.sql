/*
  Warnings:

  - You are about to drop the column `description` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ItemUsedIn` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `ItemUsedIn` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `ItemUsedIn` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ItemUsedIn` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `ItemUsedIn` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "item_type" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "value" INTEGER,
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
CREATE TABLE "new_ItemComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemComponent_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemComponent" ("component_id", "id", "item_id", "quantity") SELECT "component_id", "id", "item_id", "quantity" FROM "ItemComponent";
DROP TABLE "ItemComponent";
ALTER TABLE "new_ItemComponent" RENAME TO "ItemComponent";
CREATE UNIQUE INDEX "ItemComponent_item_id_component_id_key" ON "ItemComponent"("item_id", "component_id");
CREATE TABLE "new_ItemRecycleComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleComponent_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemRecycleComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecycleComponent" ("component_id", "id", "item_id", "quantity") SELECT "component_id", "id", "item_id", "quantity" FROM "ItemRecycleComponent";
DROP TABLE "ItemRecycleComponent";
ALTER TABLE "new_ItemRecycleComponent" RENAME TO "ItemRecycleComponent";
CREATE UNIQUE INDEX "ItemRecycleComponent_item_id_component_id_key" ON "ItemRecycleComponent"("item_id", "component_id");
CREATE TABLE "new_ItemRecycleFrom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleFrom_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemRecycleFrom_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecycleFrom" ("component_id", "id", "item_id", "quantity") SELECT "component_id", "id", "item_id", "quantity" FROM "ItemRecycleFrom";
DROP TABLE "ItemRecycleFrom";
ALTER TABLE "new_ItemRecycleFrom" RENAME TO "ItemRecycleFrom";
CREATE UNIQUE INDEX "ItemRecycleFrom_item_id_component_id_key" ON "ItemRecycleFrom"("item_id", "component_id");
CREATE TABLE "new_ItemUsedIn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemUsedIn_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemUsedIn_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemUsedIn" ("component_id", "id", "item_id", "quantity") SELECT "component_id", "id", "item_id", "quantity" FROM "ItemUsedIn";
DROP TABLE "ItemUsedIn";
ALTER TABLE "new_ItemUsedIn" RENAME TO "ItemUsedIn";
CREATE UNIQUE INDEX "ItemUsedIn_item_id_component_id_key" ON "ItemUsedIn"("item_id", "component_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
