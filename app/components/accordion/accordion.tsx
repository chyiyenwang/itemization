"use client";

import { ReactNode, useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
  header: string;
  count?: number;
  direction?: "left" | "right";
  children: ReactNode;
}

export default function Accordion({
  header,
  count = 0,
  direction = "left",
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <div
        className={styles.header}
        onClick={() => count > 0 && setIsOpen(!isOpen)}
      >
        <span>
          <i
            className={[
              styles.arrow,
              isOpen && direction === "left" && styles["up-swing-left"],
              isOpen && direction === "right" && styles["up-swing-right"],
              !isOpen && styles.down,
            ]
              .filter(Boolean)
              .join(" ")}
          />
          <span>{header}</span>
        </span>
        <span>{count}</span>
      </div>
      <div
        className={[styles.content, isOpen && styles.open]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
