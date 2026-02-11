import styles from "./Card.module.css";
import Image from "next/image";
import { RarityType } from "@/app/types";
import Badge from "@/app/components/Badge/Badge";
import Thumbnail from "../Thumbnail/Thumbnail";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardBody from "./CardBody";

interface CardProps {
  name: string;
  description: string;
  icon: string;
  rarity: RarityType;
  type: string;
  area: string | null;
  value: number;
  weight: number;
  stackSize: number;
}

export default function Card({
  name,
  description,
  icon,
  rarity,
  type,
  area,
  value,
  weight,
  stackSize,
}: CardProps) {
  return (
    <div className={styles.card}>
      <CardHeader rarity={rarity} src={icon} type={type} alt={name} />
      <CardBody
        rarity={rarity}
        type={type}
        name={name}
        description={description}
        area={area}
      />
      <CardFooter weight={weight} value={value} />
    </div>
  );
}
