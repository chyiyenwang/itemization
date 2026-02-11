import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import styles from "./Card.module.css";
import { RarityType } from "@/app/types";

interface ItemTooltipProps {
  rarity: RarityType;
  type: string;
  name: string;
  description: string;
  area: string | null;
  weight: number;
  value: number;
}

export default function ItemTooltip({
  rarity,
  type,
  name,
  description,
  area,
  weight,
  value
}: ItemTooltipProps) {
  return (
    <div className={styles.tooltip}>
      <CardBody
        rarity={rarity}
        type={type}
        name={name}
        description={description}
        area={area}
      />
      <CardFooter weight={weight} value={value} />
    </div>
  )
}