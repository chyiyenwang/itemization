import HoverThumbnail from "./hover-thumbnail";
import { Component } from "@/app/lib/items/item.types";

interface ThumbnailListProps {
  data: Component[];
}

export default function ThumbnailList({ data }: ThumbnailListProps) {
  return (
    <>
      {[...data]
        .sort((a, b) => a.component.id.localeCompare(b.component.id))
        .map((component) => (
          <HoverThumbnail key={component.component.id} data={component} />
        ))}
    </>
  );
}
