/*
  Warnings:

  - You are about to drop the column `ammo_type` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `created_at_api` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `flavor_text` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `last_fetched` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `loot_area` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `shield_type` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at_api` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `component_id` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `ItemComponent` table. All the data in the column will be lost.
  - You are about to drop the column `component_id` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - You are about to drop the column `component_id` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - You are about to drop the column `component_id` on the `ItemUsedIn` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `ItemUsedIn` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `Stat` table. All the data in the column will be lost.
  - Added the required column `itemType` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentId` to the `ItemComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `ItemComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentId` to the `ItemRecycleComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `ItemRecycleComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentId` to the `ItemRecycleFrom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `ItemRecycleFrom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentId` to the `ItemUsedIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `ItemUsedIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
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
INSERT INTO "new_Item" ("description", "icon", "id", "name", "rarity", "sources", "subcategory", "value", "workbench") SELECT "description", "icon", "id", "name", "rarity", "sources", "subcategory", "value", "workbench" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_itemType_idx" ON "Item"("itemType");
CREATE INDEX "Item_rarity_idx" ON "Item"("rarity");
CREATE TABLE "new_ItemComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemComponent" ("id", "quantity") SELECT "id", "quantity" FROM "ItemComponent";
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
INSERT INTO "new_ItemRecycleComponent" ("id", "quantity") SELECT "id", "quantity" FROM "ItemRecycleComponent";
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
INSERT INTO "new_ItemRecycleFrom" ("id", "quantity") SELECT "id", "quantity" FROM "ItemRecycleFrom";
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
INSERT INTO "new_ItemUsedIn" ("id", "quantity") SELECT "id", "quantity" FROM "ItemUsedIn";
DROP TABLE "ItemUsedIn";
ALTER TABLE "new_ItemUsedIn" RENAME TO "ItemUsedIn";
CREATE UNIQUE INDEX "ItemUsedIn_itemId_componentId_key" ON "ItemUsedIn"("itemId", "componentId");
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "range" REAL NOT NULL DEFAULT 0,
    "damage" REAL NOT NULL DEFAULT 0,
    "health" REAL NOT NULL DEFAULT 0,
    "radius" REAL NOT NULL DEFAULT 0,
    "shield" REAL NOT NULL DEFAULT 0,
    "weight" REAL NOT NULL DEFAULT 0,
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
    CONSTRAINT "Stat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("agility", "arcStun", "augmentSlots", "backpackSlots", "damage", "damageMitigation", "damageMult", "damagePerSecond", "duration", "fireRate", "healing", "healingPerSecond", "healingSlots", "health", "id", "illuminationRadius", "increasedADSSpeed", "increasedBulletVelocity", "increasedEquipTime", "increasedFireRate", "increasedRecoilRecoveryTime", "increasedUnequipTime", "increasedVerticalRecoil", "magazineSize", "movementPenalty", "quickUseSlots", "radius", "raiderStun", "range", "reducedDispersionRecoveryTime", "reducedDurabilityBurnRate", "reducedEquipTime", "reducedMaxShotDispersion", "reducedNoise", "reducedPerShotDispersion", "reducedRecoilRecoveryTime", "reducedReloadTime", "reducedUnequipTime", "reducedVerticalRecoil", "safePocketSlots", "shield", "shieldCharge", "shieldCompatibility", "stability", "stackSize", "stamina", "staminaPerSecond", "stealth", "useTime", "weight", "weightLimit") SELECT "agility", "arcStun", "augmentSlots", "backpackSlots", "damage", "damageMitigation", "damageMult", "damagePerSecond", "duration", "fireRate", "healing", "healingPerSecond", "healingSlots", "health", "id", "illuminationRadius", "increasedADSSpeed", "increasedBulletVelocity", "increasedEquipTime", "increasedFireRate", "increasedRecoilRecoveryTime", "increasedUnequipTime", "increasedVerticalRecoil", "magazineSize", "movementPenalty", "quickUseSlots", "radius", "raiderStun", "range", "reducedDispersionRecoveryTime", "reducedDurabilityBurnRate", "reducedEquipTime", "reducedMaxShotDispersion", "reducedNoise", "reducedPerShotDispersion", "reducedRecoilRecoveryTime", "reducedReloadTime", "reducedUnequipTime", "reducedVerticalRecoil", "safePocketSlots", "shield", "shieldCharge", "shieldCompatibility", "stability", "stackSize", "stamina", "staminaPerSecond", "stealth", "useTime", "weight", "weightLimit" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_itemId_key" ON "Stat"("itemId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
