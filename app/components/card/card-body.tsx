import Badge from "../badge/badge";
import { RarityType } from "@/app/types";
import styles from "./card.module.css";

interface CardBodyProps {
  rarity: RarityType;
  type: string;
  name: string;
  description?: string | null;
  area?: string | null;
}

export default function CardBody({
  rarity,
  type,
  name,
  description,
  area,
}: CardBodyProps) {
  return (
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
  );
}
