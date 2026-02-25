/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemType` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_type` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "range" REAL NOT NULL DEFAULT 0,
    "damage" REAL NOT NULL DEFAULT 0,
    "health" REAL NOT NULL DEFAULT 0,
    "radius" REAL NOT NULL DEFAULT 0,
    "shield" REAL NOT NULL DEFAULT 0,
    "weight" REAL NOT NULL,
    "agility" REAL NOT NULL DEFAULT 0,
    "arcStun" REAL NOT NULL DEFAULT 0,
    "healing" REAL NOT NULL DEFAULT 0,
    "stamina" REAL NOT NULL DEFAULT 0,
    "stealth" REAL NOT NULL DEFAULT 0,
    "useTime" REAL NOT NULL DEFAULT 0,
    "duration" REAL NOT NULL DEFAULT 0,
    "fireRate" REAL NOT NULL DEFAULT 0,
    "stability" REAL NOT NULL DEFAULT 0,
    "stackSize" REAL NOT NULL DEFAULT 0,
    "damageMult" REAL NOT NULL DEFAULT 0,
    "raiderStun" REAL NOT NULL DEFAULT 0,
    "weightLimit" REAL NOT NULL DEFAULT 0,
    "augmentSlots" REAL NOT NULL DEFAULT 0,
    "healingSlots" REAL NOT NULL DEFAULT 0,
    "magazineSize" REAL NOT NULL DEFAULT 0,
    "reducedNoise" REAL NOT NULL DEFAULT 0,
    "shieldCharge" REAL NOT NULL DEFAULT 0,
    "backpackSlots" REAL NOT NULL DEFAULT 0,
    "quickUseSlots" REAL NOT NULL DEFAULT 0,
    "damagePerSecond" REAL NOT NULL DEFAULT 0,
    "movementPenalty" REAL NOT NULL DEFAULT 0,
    "safePocketSlots" REAL NOT NULL DEFAULT 0,
    "damageMitigation" REAL NOT NULL DEFAULT 0,
    "healingPerSecond" REAL NOT NULL DEFAULT 0,
    "reducedEquipTime" REAL NOT NULL DEFAULT 0,
    "staminaPerSecond" REAL NOT NULL DEFAULT 0,
    "increasedADSSpeed" REAL NOT NULL DEFAULT 0,
    "increasedFireRate" REAL NOT NULL DEFAULT 0,
    "reducedReloadTime" REAL NOT NULL DEFAULT 0,
    "illuminationRadius" REAL NOT NULL DEFAULT 0,
    "increasedEquipTime" REAL NOT NULL DEFAULT 0,
    "reducedUnequipTime" REAL NOT NULL DEFAULT 0,
    "shieldCompatibility" TEXT,
    "increasedUnequipTime" REAL NOT NULL DEFAULT 0,
    "reducedVerticalRecoil" REAL NOT NULL DEFAULT 0,
    "increasedBulletVelocity" REAL NOT NULL DEFAULT 0,
    "increasedVerticalRecoil" REAL NOT NULL DEFAULT 0,
    "reducedMaxShotDispersion" REAL NOT NULL DEFAULT 0,
    "reducedPerShotDispersion" REAL NOT NULL DEFAULT 0,
    "reducedDurabilityBurnRate" REAL NOT NULL DEFAULT 0,
    "reducedRecoilRecoveryTime" REAL NOT NULL DEFAULT 0,
    "increasedRecoilRecoveryTime" REAL NOT NULL DEFAULT 0,
    "reducedDispersionRecoveryTime" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "Stat_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemComponent_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemRecycleComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleComponent_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemRecycleFrom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleFrom_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemUsedIn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemUsedIn_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "updated_at" DATETIME NOT NULL,
    "statId" TEXT NOT NULL
);
INSERT INTO "new_Item" ("icon", "id", "name", "rarity", "value") SELECT "icon", "id", "name", "rarity", "value" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_item_type_idx" ON "Item"("item_type");
CREATE INDEX "Item_rarity_idx" ON "Item"("rarity");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Stat_item_id_key" ON "Stat"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemComponent_item_id_component_id_key" ON "ItemComponent"("item_id", "component_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemRecycleComponent_item_id_component_id_key" ON "ItemRecycleComponent"("item_id", "component_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemRecycleFrom_item_id_component_id_key" ON "ItemRecycleFrom"("item_id", "component_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemUsedIn_item_id_component_id_key" ON "ItemUsedIn"("item_id", "component_id");
