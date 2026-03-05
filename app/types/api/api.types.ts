// probably dont need this file

import { CapitalizedRarityType } from "@/app/types";

export interface ApiDataItem {
  id: string;
  name: string;
  description: string;
  loot_area: string | null;
  rarity: CapitalizedRarityType;
  icon: string;
  item_type: string;
  value: number;
  workbench: string;
  stat_block: ApiDataStat;
  flavor_text: string;
  subcategory: string;
  created_at: Date;
  updated_at: Date;
  shield_type: string;
  sources: string;
  ammo_type: string;
  components: ApiDataChildComponent[];
  recycle_components: ApiDataChildComponent[];
  recycle_from: ApiDataChildItem[];
  used_in: ApiDataChildItem[];
}

export interface ApiDataStat {
  range: number;
  damage: number;
  health: number;
  radius: number;
  shield: number;
  weight: number;
  agility: number;
  arcStun: number;
  healing: number;
  stamina: number;
  stealth: number;
  useTime: number;
  duration: number;
  fireRate: number;
  stability: number;
  stackSize: number;
  damageMult: number;
  raiderStun: number;
  weightLimit: number;
  augmentSlots: number;
  healingSlots: number;
  magazineSize: number;
  reducedNoise: number;
  shieldCharge: number;
  backpackSlots: number;
  quickUseSlots: number;
  damagePerSecond: number;
  movementPenalty: number;
  safePocketSlots: number;
  damageMitigation: number;
  healingPerSecond: number;
  reducedEquipTime: number;
  staminaPerSecond: number;
  increasedADSSpeed: number;
  increasedFireRate: number;
  reducedReloadTime: number;
  illuminationRadius: number;
  increasedEquipTime: number;
  reducedUnequipTime: number;
  shieldCompatibility: string | number;
  increasedUnequipTime: number;
  reducedVerticalRecoil: number;
  increasedBulletVelocity: number;
  increasedVerticalRecoil: number;
  reducedMaxShotDispersion: number;
  reducedPerShotDispersion: number;
  reducedDurabilityBurnRate: number;
  reducedRecoilRecoveryTime: number;
  increasedRecoilRecoveryTime: number;
  reducedDispersionRecoveryTime: number;
}

export interface ApiDataChildComponent {
  component: ApiComponentDetail;
  quantity: number;
}

export interface ApiDataChildItem {
  item: ApiComponentDetail;
  quantity: number;
}

export interface ApiComponentDetail {
  id: string;
  name: string;
  icon: string;
  rarity: CapitalizedRarityType;
  item_type: string;
  description?: string;
}
