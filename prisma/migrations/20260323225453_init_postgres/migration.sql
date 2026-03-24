-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
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
    "createdAtApi" TIMESTAMP(3),
    "updatedAtApi" TIMESTAMP(3),
    "lastFetched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "range" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "damage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "health" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "radius" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shield" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "agility" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "arcStun" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "healing" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stamina" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stealth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "useTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "duration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fireRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stackSize" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "damageMult" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "raiderStun" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weightLimit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "augmentSlots" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "healingSlots" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "magazineSize" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedNoise" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shieldCharge" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "backpackSlots" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quickUseSlots" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "damagePerSecond" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "movementPenalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "safePocketSlots" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "damageMitigation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "healingPerSecond" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedEquipTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "staminaPerSecond" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedADSSpeed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedFireRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedReloadTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "illuminationRadius" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedEquipTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedUnequipTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shieldCompatibility" TEXT,
    "increasedUnequipTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedVerticalRecoil" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedBulletVelocity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedVerticalRecoil" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedMaxShotDispersion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedPerShotDispersion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedDurabilityBurnRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedRecoilRecoveryTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedRecoilRecoveryTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reducedDispersionRecoveryTime" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemComponent" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemRecycleComponent" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemRecycleComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemRecycleFrom" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemRecycleFrom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemUsedIn" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemUsedIn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Item_itemType_idx" ON "Item"("itemType");

-- CreateIndex
CREATE INDEX "Item_rarity_idx" ON "Item"("rarity");

-- CreateIndex
CREATE UNIQUE INDEX "Stat_itemId_key" ON "Stat"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemComponent_itemId_componentId_key" ON "ItemComponent"("itemId", "componentId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemRecycleComponent_itemId_componentId_key" ON "ItemRecycleComponent"("itemId", "componentId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemRecycleFrom_itemId_componentId_key" ON "ItemRecycleFrom"("itemId", "componentId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemUsedIn_itemId_componentId_key" ON "ItemUsedIn"("itemId", "componentId");

-- AddForeignKey
ALTER TABLE "Stat" ADD CONSTRAINT "Stat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemComponent" ADD CONSTRAINT "ItemComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemComponent" ADD CONSTRAINT "ItemComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRecycleComponent" ADD CONSTRAINT "ItemRecycleComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRecycleComponent" ADD CONSTRAINT "ItemRecycleComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRecycleFrom" ADD CONSTRAINT "ItemRecycleFrom_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRecycleFrom" ADD CONSTRAINT "ItemRecycleFrom_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemUsedIn" ADD CONSTRAINT "ItemUsedIn_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemUsedIn" ADD CONSTRAINT "ItemUsedIn_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
