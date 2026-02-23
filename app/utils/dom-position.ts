type TriggerRect = {
  top: number;
  left: number;
  right: number;
  height: number;
};

type ContentRect = {
  height: number;
  width: number;
};

const OFFSET = 8;
export const calculatePosition = (
  triggerRect: TriggerRect,
  contentRect: ContentRect,
) => {
  if (typeof window === "undefined") return { top: 0, left: 0 };

  const top =
    window.innerHeight - (triggerRect.top + OFFSET) < contentRect.height
      ? triggerRect.top - (contentRect.height - triggerRect.height)
      : triggerRect.top;

  const left =
    window.innerWidth - (triggerRect.right + OFFSET) < contentRect.width
      ? triggerRect.left - contentRect.width - OFFSET
      : triggerRect.right + OFFSET;

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
  };
};
