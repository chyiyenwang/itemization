import Image from "next/image";
import RaiderCoin from "@/public/raider-coin.webp";
import styles from "./card.module.css";

interface CardFooterProps {
  weight?: number;
  value: number;
}

export default function CardFooter({ weight, value }: CardFooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.stat}>{weight ? `${weight} kg` : "N/A"}</div>
      <div className={styles.stat}>
        {value ? (
          <>
            <Image
              src={RaiderCoin}
              alt="raider coin"
              width={16}
              height={16}
              loading="eager"
            />
            <span>{value}</span>
          </>
        ) : (
          "N/A"
        )}
      </div>
    </div>
  );
}
