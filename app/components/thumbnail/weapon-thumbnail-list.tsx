"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Component } from "@/app/lib/items/item.types";
import styles from "./thumbnail.module.css";
import { calculatePosition } from "@/app/utils/dom-position";
import SpeedDial from "../card/speed-dial";
import useOpenTimeout from "@/app/hooks/use-delayed-hover";

interface WeaponThumbnailProps {
  data: Component[];
  children: React.ReactNode;
}

export default function WeaponThumbnail({
  data,
  children,
}: WeaponThumbnailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const rectRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { handleDelayedOpen, handleDelayedClose } = useOpenTimeout({
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  });

  useLayoutEffect(() => {
    setIsActive(true);
  }, [isActive]);

  useLayoutEffect(() => {
    if (!isOpen || !rectRef.current || !contentRef.current) return;
    const rect = rectRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();

    const { top, left } = calculatePosition(rect, content);

    setPosition({ top, left });
  }, [isOpen]);

  return (
    <div
      ref={rectRef}
      className={styles["weapon-thumbnail-wrapper"]}
      onMouseEnter={handleDelayedOpen}
      onMouseLeave={handleDelayedClose}
    >
      {children}
      {isActive &&
        createPortal(
          <SpeedDial
            ref={contentRef}
            data={[...data]}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              opacity: isOpen ? "1" : "0",
            }}
          />,
          document.body,
        )}
    </div>
  );
}
