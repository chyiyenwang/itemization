import { RarityType } from "@/app/types";

export interface Component {
  component: {
    id: string;
    name: string;
    icon: string;
    rarity: RarityType;
    itemType: string;
    description?: string;
  };
  quantity: number | string;
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
  components?: Component[];
  recycleComponents?: Component[];
  recycleFrom?: Component[];
  usedIn?: Component[];
}
