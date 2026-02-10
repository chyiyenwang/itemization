import Image from "next/image";
import styles from "./thumbnail.module.css";

interface ThumbnailProps {
  rarity: string;
  icon: string;
  type: string;
  name: string;
}

const iconWrapperStyles = (type: string, rarity: string) => {
  switch (type) {
    case "Blueprint":
      return `url('https://cdn.metaforge.app/arc-raiders/ui/blueprint-bg.webp') center/cover`;
    default:
      return `linear-gradient(45deg, var(--rarity-${rarity}-medium), var(--rarity-${rarity}-dark))`;
  }
};

export default function Thumbnail({
  rarity,
  icon,
  type,
  name,
}: ThumbnailProps) {
  return (
    <div
      className={styles.thumbnail}
      style={{ backgroundColor: `var(--rarity-${rarity})` }}
    >
      <div
        className={styles["icon-wrapper"]}
        style={{
          background: iconWrapperStyles(type, rarity),
        }}
      >
        <Image src={icon} alt={`${name} icon`} fill objectFit="contain" />
      </div>
    </div>
  );
}
