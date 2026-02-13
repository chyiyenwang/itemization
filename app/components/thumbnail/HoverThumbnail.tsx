"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ItemTooltip from "../Card/ItemTooltip";
import { RarityType } from "@/app/types";
import Thumbnail from "./Thumbnail";

import useTooltip from "@/app/hooks/useTooltip";

import styles from "./Thumbnail.module.css";

interface HoverThumbnailProps {
  href: string;
  src: string;
  name: string;
  description?: string | null;
  rarity: RarityType;
  type: string;
  quantity: string | null;
}

export default function HoverThumbnail({
  href,
  src,
  name,
  description,
  rarity,
  type,
  quantity,
}: HoverThumbnailProps) {
  const {
    handleEnter,
    handleLeave,
    showPopover,
    position,
    triggerRef,
    contentRef,
  } = useTooltip();

  return (
    <div ref={triggerRef} className={styles["thumbnail-wrapper"]}>
      <Link href={href} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Thumbnail
          rarity={rarity}
          src={src}
          type={type}
          alt={name}
          quantity={quantity}
          sizes="(max-width: 100px), (max-width: 100px)"
        />
      </Link>
      {showPopover &&
        createPortal(
          <ItemTooltip
            ref={contentRef}
            name={name}
            description={description}
            rarity={rarity}
            type={type}
            style={{
              position: "absolute",
              left: `${position.left}px`,
              top: `${position.top}px`,
            }}
          />,
          document.body,
        )}
    </div>
  );
}
