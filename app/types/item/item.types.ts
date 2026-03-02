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
  workbench?: string;
  flavorText?: string;
  subcategory?: string;
  createdAtApi?: Date;
  updatedAtApi?: Date;
  shieldType?: string;
  sources?: string;
  ammoType?: string;
  createdAt: Date;
  updatedAt: Date;
  components: Component[];
  recycleComponents: Component[];
  recycleFrom: Component[];
  usedIn: Component[];
}
