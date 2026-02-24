"use client";

import { useState, useRef, useLayoutEffect, ReactNode, useMemo } from "react";
import TooltipContext from "../contexts/tooltip-context";
import { createPortal } from "react-dom";
import ItemTooltip from "../components/card/item-tooltip";
import { calculatePosition } from "../utils/dom-position";
import { Component } from "../lib/items/item.types";
import useDelayedHover from "../hooks/use-delayed-hover";

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

  const { handleDelayedOpen, handleDelayedClose } = useDelayedHover({
    onOpen: (e, data) => {
      const rect = e.getBoundingClientRect();
      setActiveItem(data);
      setTriggerRect(rect);
      setIsOpen(true);
    },
    onClose: () => setIsOpen(false),
  });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRect || !contentRef.current) return;

    const tooltip = contentRef.current.getBoundingClientRect();

    const { top, left } = calculatePosition(triggerRect, tooltip);

    setPosition({ top, left });
  }, [isOpen, triggerRect]);

  const value = useMemo(() => {
    return {
      handleEnter: handleDelayedOpen,
      handleLeave: handleDelayedClose,
    };
  }, [handleDelayedOpen, handleDelayedClose]);

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
              left: `${position.left}px`,
              top: `${position.top}px`,
              opacity: `${isOpen ? 1 : 0}`,
            }}
          />,
          document.body,
        )}
    </TooltipContext.Provider>
  );
}
