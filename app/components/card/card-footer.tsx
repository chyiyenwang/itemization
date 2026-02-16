import Image from "next/image";
import RaiderCoin from "@/public/raider-coin.webp";
import styles from "./Card.module.css";

interface CardFooterProps {
  weight: number;
  value: number;
}

export default function CardFooter({ weight, value }: CardFooterProps) {
  return (
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
  );
}
