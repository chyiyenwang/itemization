import { RarityType } from "@/app/types";

export interface Component {
  id: string;
  name: string;
  icon: string;
  rarity: RarityType;
  itemType: string;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  lootArea: string | null;
  rarity: RarityType;
  icon: string;
  itemType: string;
  value: number;
  statBlock: {
    weight: number;
    stackSize: number;
  };
  recycleComponents?: Component[];
  recycleFrom?: Component[];
  usedIn?: Component[];
}
