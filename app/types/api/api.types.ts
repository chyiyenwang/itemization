import { RarityType } from "../core";

export interface ApiBaseComponent {
  id: string;
  name: string;
  icon: string;
  rarity: RarityType;
  item_type: string;
  description?: string;
}

// item = used_in && recycle_from
// component = components && recycle_components
export interface ApiDataComponent {
  item?: ApiBaseComponent;
  component?: ApiBaseComponent;
  quantity: number;
}

export interface ApiDataItem {
  id: string;
  name: string;
  description: string;
  loot_area: string | null;
  rarity: RarityType;
  icon: string;
  item_type: string;
  value: number;
  workbench: string;
  stat_block: {
    weight: number;
    stackSize: number;
  };
  flavor_text: string;
  subcategory: string;
  created_at: Date;
  updated_at: Date;
  shield_type: string;
  sources: string;
  ammo_type: string;
  components: ApiDataComponent[];
  recycle_components: ApiDataComponent[];
  recycle_from: ApiDataComponent[];
  used_in: ApiDataComponent[];
}
