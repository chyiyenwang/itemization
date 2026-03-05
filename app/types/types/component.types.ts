import { RarityType } from "../core";

export type Component = {
  component: {
    id: string;
    name: string;
    icon: string;
    rarity: RarityType;
    itemType: string;
    description: string;
  };
  quantity: number;
};
