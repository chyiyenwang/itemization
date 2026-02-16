"use client";

import Link from "next/link";
import Thumbnail from "./Thumbnail";

import useTooltip from "@/app/hooks/useTooltip";

import styles from "./Thumbnail.module.css";
import { Component } from "@/app/lib/items/item.types";

interface HoverThumbnailProps {
  data: Component;
}

export default function HoverThumbnail({ data }: HoverThumbnailProps) {
  const {
    component: { id, rarity, icon: src, itemType: type, name },
    quantity,
  } = data;

  const {
    handleEnter,
    handleLeave,
    triggerRef,
  } = useTooltip();

  return (
    <div ref={triggerRef} className={styles["thumbnail-wrapper"]}>
      <Link
        href={`/images/${id}`}
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
