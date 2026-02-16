import styles from "./Card.module.css";
import Image from "next/image";
import { RarityType } from "@/app/types";
import Badge from "@/app/components/badge/badge";
import Thumbnail from "../thumbnail/thumbnail";
import CardHeader from "./card-header";
import CardFooter from "./card-footer";
import CardBody from "./card-body";

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
