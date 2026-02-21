import Image, { ImageProps } from "next/image";
import styles from "./thumbnail.module.css";
import Badge from "../badge/badge";

interface ThumbnailProps extends ImageProps {
  rarity: string;
  type: string;
  quantity: string | number | null;
}

export default function Thumbnail({
  rarity,
  src,
  alt,
  type,
  quantity,
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
          background:
            type === "Blueprint"
              ? `url('https://cdn.metaforge.app/arc-raiders/ui/blueprint-bg.webp') center/cover`
              : `linear-gradient(45deg, var(--rarity-${rarity}-medium), var(--rarity-${rarity}-dark))`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          {...props}
        />
        {quantity && (
          <div className={styles["badge-wrapper"]}>
            <Badge variant="rounded" label={quantity} />
          </div>
        )}
      </div>
    </div>
  );
}
