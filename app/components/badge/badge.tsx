import { RarityType } from "@/app/types";
import styles from "./Badge.module.css";

interface BadgeProps {
  variant?: "default" | "rounded";
  label: string;
  rarity?: RarityType;
}

export default function Badge({
  variant = "default",
  label,
  rarity = "generic",
}: BadgeProps) {
  const rounded = variant === "rounded" && styles.rounded;
  return (
    <div
      className={[styles.default, rounded].filter(Boolean).join(" ")}
      style={{ backgroundColor: `var(--rarity-${rarity})` }}
    >
      {label}
    </div>
  );
}
