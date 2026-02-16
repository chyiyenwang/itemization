import { useContext } from "react";
import TooltipContext from "../contexts/TooltipContext";

export default function useTooltip() {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error("TooltipContext must be used within a Provider");
  }

  return context;
}
