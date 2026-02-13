"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ItemTooltip from "../Card/ItemTooltip";
import { RarityType } from "@/app/types";
import Thumbnail from "./Thumbnail";

import styles from "./Thumbnail.module.css";

const OFFSET = 8;

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
  const [showPopover, setShowPopover] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const thumbnailWrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const clearOpenTimeout = () => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
  };

  const handleEnter = () => {
    clearOpenTimeout();

    openTimeout.current = setTimeout(() => {
      setShowPopover(true);
    }, 120);
  };

  const handleLeave = () => {
    clearOpenTimeout();
    setShowPopover(false);
  };

  useEffect(() => {
    return clearOpenTimeout;
  }, [clearOpenTimeout]);

  useLayoutEffect(() => {
    if (showPopover && thumbnailWrapperRef.current && tooltipRef.current) {
      const rect = thumbnailWrapperRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();

      const top =
        window.innerHeight - (rect.top + OFFSET) < tooltip.height
          ? rect.top - (tooltip.height - rect.height)
          : rect.top;

      const left =
        window.innerWidth - (rect.right + OFFSET) < tooltip.width
          ? rect.left - tooltip.width - OFFSET
          : rect.right + OFFSET;

      setPosition({ top, left });
    }
  }, [showPopover]);

  return (
    <div ref={thumbnailWrapperRef} className={styles["thumbnail-wrapper"]}>
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
            ref={tooltipRef}
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
