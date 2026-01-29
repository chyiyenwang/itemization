import styles from "./card.module.css";
import Image from "next/image";
import RaiderCoin from "@/public/raider-coin.webp";

interface BadgeProps {
  label: string;
  rarity: string;
}

const Badge = ({ label, rarity }: BadgeProps) => (
  <div
    className={styles.badge}
    style={{ backgroundColor: `var(--rarity-${rarity?.toLowerCase()})` }}
  >
    {label}
  </div>
);

interface CardProps {
  name: string;
  description: string;
  icon: string;
  rarity: string;
  type: string;
  area: string;
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
      <div
        className={styles.header}
        style={{ backgroundColor: `var(--rarity-${rarity?.toLowerCase()})` }}
      >
        {/* <img src={icon} alt={name} className={styles.icon} /> */}
      </div>

      <div className={styles.body}>
        <div className={styles.badges}>
          <Badge label={type} rarity={rarity} />
          <Badge label={rarity} rarity={rarity} />
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <h3 className={styles.location}>CAN BE FOUND IN</h3>
        <p className={styles.area}>{area}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.stat}>{weight} kg</div>
        <div className={styles.stat}>
          <Image src={RaiderCoin} alt="raider coin" width={16} height={16} />
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
}
