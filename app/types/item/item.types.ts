import { RarityType } from "../core";
import { Component } from "./component.types";

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
