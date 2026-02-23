"use client";

import Link from "next/link";

import useTooltip from "@/app/hooks/use-tooltip";

import styles from "./thumbnail.module.css";
import { Component } from "@/app/lib/items/item.types";

interface HoverThumbnailProps {
  data: Component;
  children: React.ReactNode;
}

export default function HoverThumbnail({
  data,
  children,
}: HoverThumbnailProps) {
  const { component } = data;
  const { id } = component;

  const { handleEnter, handleLeave } = useTooltip();

  return (
    <div
      className={styles["thumbnail-wrapper"]}
      onMouseEnter={(e) => handleEnter(e.currentTarget, component)}
      onMouseLeave={handleLeave}
    >
      <Link href={`/items/${id}`}>{children}</Link>
    </div>
  );
}
