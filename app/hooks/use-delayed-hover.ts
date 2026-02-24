import { useRef, useCallback, useEffect } from "react";
import { Component } from "../lib/items/item.types";

interface UseDelayedHoverOptions<T extends any[]> {
  delay?: number;
  onOpen: (...args: T) => void;
  onClose: () => void;
}

export default function useDelayedHover<T extends any[]>({
  delay = 120,
  onOpen,
  onClose,
}: UseDelayedHoverOptions<T>) {
  const openTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOpenTimeout = useCallback(() => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
  }, []);

  const handleDelayedOpen = useCallback(
    (...args: T) => {
      clearOpenTimeout();
      openTimeout.current = setTimeout(() => {
        onOpen(...args);
      }, delay);
    },
    [delay, onOpen, clearOpenTimeout],
  );

  const handleDelayedClose = useCallback(() => {
    clearOpenTimeout();
    onClose();
  }, [onClose, clearOpenTimeout]);

  useEffect(() => {
    return clearOpenTimeout;
  }, [clearOpenTimeout]);

  return {
    handleDelayedOpen,
    handleDelayedClose,
  };
}
