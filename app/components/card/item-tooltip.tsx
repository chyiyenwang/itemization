import { forwardRef, ForwardedRef } from "react";
import CardBody from "./card-body";
import styles from "./Card.module.css";
import { RarityType } from "@/app/types";
import { CSSProperties } from "react";

interface ItemTooltipProps {
  rarity: RarityType;
  type: string;
  name: string;
  description?: string | null;
  style: CSSProperties;
}

export default forwardRef(function ItemTooltip(
  { rarity, type, name, description, style }: ItemTooltipProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={styles.tooltip} style={style}>
      <CardBody
        rarity={rarity}
        type={type}
        name={name}
        description={description}
      />
    </div>
  );
});
