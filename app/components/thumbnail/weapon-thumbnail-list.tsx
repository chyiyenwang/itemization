"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Thumbnail from "./thumbnail";
import { Component } from "@/app/lib/items/item.types";
import styles from "./thumbnail.module.css";
import { calculatePosition } from "@/app/utils/dom-position";
import SpeedDial from "../card/speed-dial";

interface WeaponThumbnailProps {
  data: Component[];
  children: React.ReactNode;
}

export default function WeaponThumbnail({
  data,
  children,
}: WeaponThumbnailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const rectRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    if (!isOpen || !rectRef.current || !contentRef.current) return;
    const rect = rectRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();

    const { top, left } = calculatePosition(rect, content);
    console.log({ top, left });
    setPosition({ top: top - 8, left });
  }, [isOpen]);

  return (
    <div
      ref={rectRef}
      className={styles["weapon-thumbnail-wrapper"]}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {children}
      {isOpen &&
        createPortal(
          <SpeedDial
            ref={contentRef}
            data={[...data]}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
            }}
          />,
          document.body,
        )}
    </div>
  );
}
