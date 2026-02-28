/*
  Warnings:

  - The primary key for the `ItemComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `component_id` on the `ItemComponent` table. All the data in the column will be lost.
  - The primary key for the `ItemRecycleComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `component_id` on the `ItemRecycleComponent` table. All the data in the column will be lost.
  - The primary key for the `ItemRecycleFrom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `component_id` on the `ItemRecycleFrom` table. All the data in the column will be lost.
  - The primary key for the `ItemUsedIn` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `component_id` on the `ItemUsedIn` table. All the data in the column will be lost.
  - The required column `pk_id` was added to the `ItemComponent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pk_id` was added to the `ItemRecycleComponent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pk_id` was added to the `ItemRecycleFrom` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pk_id` was added to the `ItemUsedIn` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemComponent" (
    "pk_id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemComponent_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemComponent" ("id", "item_id", "quantity") SELECT "id", "item_id", "quantity" FROM "ItemComponent";
DROP TABLE "ItemComponent";
ALTER TABLE "new_ItemComponent" RENAME TO "ItemComponent";
CREATE UNIQUE INDEX "ItemComponent_item_id_id_key" ON "ItemComponent"("item_id", "id");
CREATE TABLE "new_ItemRecycleComponent" (
    "pk_id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleComponent_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecycleComponent" ("id", "item_id", "quantity") SELECT "id", "item_id", "quantity" FROM "ItemRecycleComponent";
DROP TABLE "ItemRecycleComponent";
ALTER TABLE "new_ItemRecycleComponent" RENAME TO "ItemRecycleComponent";
CREATE UNIQUE INDEX "ItemRecycleComponent_item_id_id_key" ON "ItemRecycleComponent"("item_id", "id");
CREATE TABLE "new_ItemRecycleFrom" (
    "pk_id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemRecycleFrom_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecycleFrom" ("id", "item_id", "quantity") SELECT "id", "item_id", "quantity" FROM "ItemRecycleFrom";
DROP TABLE "ItemRecycleFrom";
ALTER TABLE "new_ItemRecycleFrom" RENAME TO "ItemRecycleFrom";
CREATE UNIQUE INDEX "ItemRecycleFrom_item_id_id_key" ON "ItemRecycleFrom"("item_id", "id");
CREATE TABLE "new_ItemUsedIn" (
    "pk_id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "ItemUsedIn_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemUsedIn" ("id", "item_id", "quantity") SELECT "id", "item_id", "quantity" FROM "ItemUsedIn";
DROP TABLE "ItemUsedIn";
ALTER TABLE "new_ItemUsedIn" RENAME TO "ItemUsedIn";
CREATE UNIQUE INDEX "ItemUsedIn_item_id_id_key" ON "ItemUsedIn"("item_id", "id");
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_id" TEXT NOT NULL,
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
    CONSTRAINT "Stat_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("agility", "arcStun", "augmentSlots", "backpackSlots", "damage", "damageMitigation", "damageMult", "damagePerSecond", "duration", "fireRate", "healing", "healingPerSecond", "healingSlots", "health", "id", "illuminationRadius", "increasedADSSpeed", "increasedBulletVelocity", "increasedEquipTime", "increasedFireRate", "increasedRecoilRecoveryTime", "increasedUnequipTime", "increasedVerticalRecoil", "item_id", "magazineSize", "movementPenalty", "quickUseSlots", "radius", "raiderStun", "range", "reducedDispersionRecoveryTime", "reducedDurabilityBurnRate", "reducedEquipTime", "reducedMaxShotDispersion", "reducedNoise", "reducedPerShotDispersion", "reducedRecoilRecoveryTime", "reducedReloadTime", "reducedUnequipTime", "reducedVerticalRecoil", "safePocketSlots", "shield", "shieldCharge", "shieldCompatibility", "stability", "stackSize", "stamina", "staminaPerSecond", "stealth", "useTime", "weight", "weightLimit") SELECT "agility", "arcStun", "augmentSlots", "backpackSlots", "damage", "damageMitigation", "damageMult", "damagePerSecond", "duration", "fireRate", "healing", "healingPerSecond", "healingSlots", "health", "id", "illuminationRadius", "increasedADSSpeed", "increasedBulletVelocity", "increasedEquipTime", "increasedFireRate", "increasedRecoilRecoveryTime", "increasedUnequipTime", "increasedVerticalRecoil", "item_id", "magazineSize", "movementPenalty", "quickUseSlots", "radius", "raiderStun", "range", "reducedDispersionRecoveryTime", "reducedDurabilityBurnRate", "reducedEquipTime", "reducedMaxShotDispersion", "reducedNoise", "reducedPerShotDispersion", "reducedRecoilRecoveryTime", "reducedReloadTime", "reducedUnequipTime", "reducedVerticalRecoil", "safePocketSlots", "shield", "shieldCharge", "shieldCompatibility", "stability", "stackSize", "stamina", "staminaPerSecond", "stealth", "useTime", "weight", "weightLimit" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_item_id_key" ON "Stat"("item_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
