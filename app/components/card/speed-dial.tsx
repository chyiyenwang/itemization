import Thumbnail from "../thumbnail/thumbnail";
import { forwardRef, ForwardedRef, CSSProperties } from "react";
import styles from "./card.module.css";
import { Component } from "@/app/lib/items/item.types";
import HoverThumbnail from "../thumbnail/hover-thumbnail";

interface SpeedDialProps {
  data: Component[];
  style: CSSProperties;
}

export default forwardRef(function SpeedDial(
  { data, style }: SpeedDialProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={styles["speed-dial"]} style={style}>
      <div className={styles["speed-dial-inner"]}>
        {data.map((c) => (
          <HoverThumbnail key={c.component.id} data={c}>
            <Thumbnail
              rarity={c.component.rarity}
              src={c.component.icon}
              type={c.component.itemType}
              alt={c.component.name}
              quantity={c.quantity}
              sizes="(max-width: 100px), (max-width: 100px)"
            />
          </HoverThumbnail>
        ))}
      </div>
    </div>
  );
});
