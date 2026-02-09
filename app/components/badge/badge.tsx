import styles from "./badge.module.css";

interface BadgeProps {
  label: string;
  rarity: string;
}

export default function Badge({ label, rarity }: BadgeProps) {
  return (
    <div
      className={styles.badge}
      style={{ backgroundColor: `var(--rarity-${rarity})` }}
    >
      {label}
    </div>
  );
}
