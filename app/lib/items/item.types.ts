import { RarityType } from "@/app/types";

export interface Item {
  id: string;
  name: string;
  description: string;
  lootArea: string;
  rarity: RarityType;
  icon: string;
  itemType: string;
  value: number;
  statBlock: {
    weight: number;
    stackSize: number;
  };
}
