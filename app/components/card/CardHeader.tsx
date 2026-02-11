import Thumbnail from "../Thumbnail/Thumbnail";
import styles from "./Card.module.css";

interface CardHeaderProps {
  rarity: string;
  src: string;
  type: string;
  alt: string;
}

export default function CardHeader({
  rarity,
  src,
  type,
  alt,
}: CardHeaderProps) {
  return (
    <div className={styles.header}>
      <Thumbnail
        rarity={rarity}
        src={src}
        type={type}
        alt={alt}
        loading="eager"
        sizes="(max-width: 400px), (max-height: 200px)"
      />
    </div>
  );
}
