import { createContext } from "react";
import { Component } from "../lib/items/item.types";

interface TooltipContextType {
  handleEnter: (event: HTMLElement, data: Component["component"]) => void;
  handleLeave: () => void;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export default TooltipContext;
