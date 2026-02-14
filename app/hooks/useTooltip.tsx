import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  RefObject,
} from "react";

interface UseTooltipReturn {
  showPopover: boolean;
  position: {
    top: number;
    left: number;
  };
  handleEnter: () => void;
  handleLeave: () => void;
  triggerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

const OFFSET = 8;

export default function useTooltip(): UseTooltipReturn {
  const [showPopover, setShowPopover] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const clearOpenTimeout = useCallback(() => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
  }, []);

  const handleEnter = () => {
    clearOpenTimeout();

    openTimeout.current = setTimeout(() => {
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
    if (showPopover && triggerRef.current && contentRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltip = contentRef.current.getBoundingClientRect();

      const top =
        window.innerHeight - (rect.top + OFFSET) < tooltip.height
          ? rect.top - (tooltip.height - rect.height)
          : rect.top;

      const left =
        window.innerWidth - (rect.right + OFFSET) < tooltip.width
          ? rect.left - tooltip.width - OFFSET
          : rect.right + OFFSET;

      setPosition({ top, left });
    }
  }, [showPopover]);

  return {
    showPopover,
    position,
    handleEnter,
    handleLeave,
    triggerRef,
    contentRef,
  };
}
