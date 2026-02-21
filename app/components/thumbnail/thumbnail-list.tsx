import HoverThumbnail from "./hover-thumbnail";
import { Component } from "@/app/lib/items/item.types";
import Thumbnail from "./thumbnail";

interface ThumbnailListProps {
  data: Component[];
}

export default function ThumbnailList({ data }: ThumbnailListProps) {
  return (
    <>
      {[...data]
        .sort((a, b) => a.component.id.localeCompare(b.component.id))
        .map((component) => (
          <HoverThumbnail key={component.component.id} data={component}>
            <Thumbnail
              rarity={component.component.rarity}
              src={component.component.icon}
              type={component.component.itemType}
              alt={component.component.name}
              quantity={component.quantity}
              sizes="(max-width: 100px), (max-width: 100px)"
            />
          </HoverThumbnail>
        ))}
    </>
  );
}
