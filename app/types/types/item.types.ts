import { Stat, Component, RarityType } from "@/app/types";

export interface Item {
  id: string;
  name: string;
  description: string;
  lootArea: string | null;
  rarity: RarityType;
  icon: string;
  itemType: string;
  value: number;
  statBlock?: Stat;
  workbench?: string;
  flavorText?: string;
  subcategory?: string;
  shieldType?: string;
  sources?: string;
  ammoType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdAtApi?: Date;
  updatedAtApi?: Date;
  components: Component[];
  recycleComponents: Component[];
  recycleFrom: Component[];
  usedIn: Component[];
}
