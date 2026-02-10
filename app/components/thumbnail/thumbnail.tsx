import Image, { ImageProps } from "next/image";
import styles from "./thumbnail.module.css";

interface ThumbnailProps extends ImageProps {
  rarity: string;
  type: string;
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
  src,
  alt,
  type,
  ...props
}: ThumbnailProps) {
  return (
    <div
      className={styles.thumbnail}
      style={{ backgroundColor: `var(--rarity-${rarity})` }}
    >
      <div
        className={styles["image-wrapper"]}
        style={{
          background: iconWrapperStyles(type, rarity),
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          {...props}
        />
      </div>
    </div>
  );
}
