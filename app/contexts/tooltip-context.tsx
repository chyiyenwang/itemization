import { createContext, RefObject } from "react";
import { Component } from "../lib/items/item.types";

interface TooltipContextType {
  isOpen: boolean;
  position: {
    top: number;
    left: number;
  };
  handleEnter: (event: HTMLElement, data: Component["component"]) => void;
  handleLeave: () => void;
  contentRef: RefObject<HTMLDivElement | null>;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export default TooltipContext;
