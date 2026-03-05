type Rect = {
  top: number;
  left: number;
  right: number;
  height: number;
};

type Tooltip = {
  height: number;
  width: number;
};

const OFFSET = 8;
export const calculatePosition = (triggerRect: Rect, tooltip: Tooltip) => {
  if (typeof window === "undefined") return { top: 0, left: 0 };

  const top =
    window.innerHeight - (triggerRect.top + OFFSET) < tooltip.height
      ? triggerRect.top - (tooltip.height - triggerRect.height)
      : triggerRect.top;

  const left =
    window.innerWidth - (triggerRect.right + OFFSET) < tooltip.width
      ? triggerRect.left - tooltip.width - OFFSET
      : triggerRect.right + OFFSET;

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
  };
};
