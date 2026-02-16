"use client";

import { ReactNode, useState } from "react";
import Badge from "../badge/badge";
import styles from "./accordion.module.css";

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

  const swingLeft = isOpen && direction === "left" && styles["up-swing-left"];
  const swingRight =
    isOpen && direction === "right" && styles["up-swing-right"];
  const downArrow = !isOpen && styles.down;

  return (
    <div className={styles.accordion}>
      <div
        className={styles.header}
        onClick={() => count > 0 && setIsOpen(!isOpen)}
      >
        <span>
          <i
            className={[styles.arrow, swingLeft, swingRight, downArrow]
              .filter(Boolean)
              .join(" ")}
          />
          <span>{header}</span>
        </span>
        <Badge variant="rounded" label={count.toString()} />
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
