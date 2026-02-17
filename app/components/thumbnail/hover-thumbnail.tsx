"use client";

import Link from "next/link";
import Thumbnail from "./thumbnail";

import useTooltip from "@/app/hooks/use-tooltip";

import styles from "./thumbnail.module.css";
import { Component } from "@/app/lib/items/item.types";

interface HoverThumbnailProps {
  data: Component;
}

export default function HoverThumbnail({ data }: HoverThumbnailProps) {
  const {
    component: { id, rarity, icon: src, itemType: type, name },
    quantity,
  } = data;

  const { handleEnter, handleLeave } = useTooltip();

  return (
    <div className={styles["thumbnail-wrapper"]}>
      <Link
        href={`/items/${id}`}
        onMouseEnter={(e) => handleEnter(e.currentTarget, data.component)}
        onMouseLeave={handleLeave}
      >
        <Thumbnail
          rarity={rarity}
          src={src}
          type={type}
          alt={name}
          quantity={quantity}
          sizes="(max-width: 100px), (max-width: 100px)"
        />
      </Link>
    </div>
  );
}
