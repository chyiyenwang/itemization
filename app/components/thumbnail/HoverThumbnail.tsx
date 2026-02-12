"use client";

import { ReactNode, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ItemTooltip from "../Card/ItemTooltip";
import { RarityType } from "@/app/types";

import styles from "./Thumbnail.module.css";

interface HoverThumbnailProps {
  href: string;
  name: string;
  description?: string | null;
  rarity: RarityType;
  type: string;
  children: ReactNode;
}

export default function HoverThumbnail({
  href,
  name,
  description,
  rarity,
  type,
  children,
}: HoverThumbnailProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const thumbnailWrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rect = thumbnailWrapperRef.current?.getBoundingClientRect();
    const tip = tooltipRef.current?.getBoundingClientRect();

    if (rect && tip) {
      setTop(rect.top);
      if (window.innerWidth - (rect.x + rect.width + 8) < tip.width) {
        // opens left
        setLeft(rect.left - tip.width - 8);
      } else {
        // opens right
        setLeft(rect.right + 8);
      }
    }
  }, [showPopover]);

  return (
    <div ref={thumbnailWrapperRef} className={styles["thumbnail-wrapper"]}>
      <Link
        href={href}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        {children}
      </Link>
      <div className={styles.testing}>hello</div>
      {showPopover &&
        createPortal(
          <ItemTooltip
            ref={tooltipRef}
            name={name}
            description={description}
            rarity={rarity}
            type={type}
            style={{ position: "absolute", left: `${left}px`, top: `${top}px` }}
          />,
          document.body,
        )}
    </div>
  );
}
