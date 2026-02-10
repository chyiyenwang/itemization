import styles from "./card.module.css";
import Image from "next/image";
import RaiderCoin from "@/public/raider-coin.webp";
import { RarityType } from "@/app/types";
import Badge from "@/app/components/badge/badge";
import Thumbnail from "../thumbnail/thumbnail";

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
      <div className={styles.header}>
        <Thumbnail
          rarity={rarity}
          src={icon}
          type={type}
          alt={name}
          loading="eager"
          sizes="(max-width: 400px), (max-height: 200px)"
        />
      </div>

      <div className={styles.body}>
        <div className={styles["badge-wrapper"]}>
          <Badge label={type} rarity={rarity} />
          <Badge label={rarity} rarity={rarity} />
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>{description}</p>
        {area && (
          <>
            <h3 className={styles.location}>CAN BE FOUND IN</h3>
            <p className={styles.area}>{area}</p>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.stat}>{weight} kg</div>
        <div className={styles.stat}>
          <Image
            src={RaiderCoin}
            alt="raider coin"
            width={16}
            height={16}
            loading="eager"
          />
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
}
