"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  ReactNode,
} from "react";
import TooltipContext from "../contexxts/TooltipContext";
import { createPortal } from "react-dom";
import ItemTooltip from "../components/Card/ItemTooltip";
import { Component } from "../lib/items/item.types";

const OFFSET = 8;

export default function TooltipProvider({ children }: { children: ReactNode }) {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [triggerData, setTriggerData] = useState<Component["component"] | null>(
    null,
  );
  const [triggerPosition, setTriggerPosition] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<{top: number, left: number}>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const clearOpenTimeout = useCallback(() => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
  }, []);

  const handleEnter = (e: HTMLElement, data: Component["component"]) => {
    clearOpenTimeout();
    const rect = e.getBoundingClientRect();

    openTimeout.current = setTimeout(() => {
      setTriggerData(data);
      setTriggerPosition(rect);
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
    if (showPopover && triggerPosition && contentRef.current) {
      const tooltip = contentRef.current.getBoundingClientRect();

      const top =
        window.innerHeight - (triggerPosition.top + OFFSET) < tooltip.height
          ? triggerPosition.top - (tooltip.height - triggerPosition.height)
          : triggerPosition.top;

      const left =
        window.innerWidth - (triggerPosition.right + OFFSET) < tooltip.width
          ? triggerPosition.left - tooltip.width - OFFSET
          : triggerPosition.right + OFFSET;

      setPosition({ top, left });
    }
  }, [showPopover]);

  const value = {
    showPopover,
    position,
    handleEnter,
    handleLeave,
    triggerRef,
    contentRef,
  };

  return (
    <TooltipContext.Provider value={value}>
      {children}
      {showPopover &&
        triggerData &&
        createPortal(
          <ItemTooltip
            ref={contentRef}
            name={triggerData.name}
            description={triggerData.description}
            rarity={triggerData.rarity}
            type={triggerData.itemType}
            style={{
              position: "absolute",
              left: `${position.left}px`,
              top: `${position.top}px`,
            }}
          />,
          document.body,
        )}
    </TooltipContext.Provider>
  );
}
