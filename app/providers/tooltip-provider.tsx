"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  ReactNode,
  useMemo,
} from "react";
import TooltipContext from "../contexts/tooltip-context";
import { createPortal } from "react-dom";
import ItemTooltip from "../components/card/item-tooltip";
import { calculatePosition } from "../utils/dom-position";
import { Component } from "../lib/items/item.types";

type Position = {
  top: number;
  left: number;
};

type Rect = {
  top: number;
  left: number;
  right: number;
  height: number;
};

export default function TooltipProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<Component["component"] | null>(
    null,
  );
  const [triggerRect, setTriggerRect] = useState<Rect | null>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const contentRef = useRef<HTMLDivElement>(null);
  const openTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOpenTimeout = useCallback(() => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
  }, []);

  const handleEnter = useCallback(
    (e: HTMLElement, data: Component["component"]) => {
      clearOpenTimeout();
      const rect = e.getBoundingClientRect();

      openTimeout.current = setTimeout(() => {
        setActiveItem(data);
        setTriggerRect(rect);
        setIsOpen(true);
      }, 120);
    },
    [clearOpenTimeout],
  );

  const handleLeave = useCallback(() => {
    clearOpenTimeout();
    setIsOpen(false);
  }, [clearOpenTimeout]);

  useEffect(() => {
    return clearOpenTimeout;
  }, [clearOpenTimeout]);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRect || !contentRef.current) return;

    const tooltip = contentRef.current.getBoundingClientRect();

    const { top, left } = calculatePosition(triggerRect, tooltip);

    setPosition({ top, left });
  }, [isOpen, triggerRect]);

  const value = useMemo(() => {
    return {
      isOpen,
      position,
      handleEnter,
      handleLeave,
      contentRef,
    };
  }, [isOpen, position, handleEnter, handleLeave, contentRef]);
  return (
    <TooltipContext.Provider value={value}>
      {children}
      {activeItem &&
        createPortal(
          <ItemTooltip
            ref={contentRef}
            name={activeItem.name}
            description={activeItem.description}
            rarity={activeItem.rarity}
            type={activeItem.itemType}
            style={{
              position: "absolute",
              left: `${position.left}px`,
              top: `${position.top}px`,
              opacity: `${isOpen ? "1" : "0"}`,
            }}
          />,
          document.body,
        )}
    </TooltipContext.Provider>
  );
}
