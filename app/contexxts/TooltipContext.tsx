"use client";

import { createContext, RefObject } from "react";
import { Component } from "../lib/items/item.types";

interface TooltipContextType {
  showPopover: boolean;
  position: {
    top: number;
    left: number;
  };
  handleEnter: (event: HTMLElement, data: Component["component"]) => void;
  handleLeave: () => void;
  triggerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export default TooltipContext;
