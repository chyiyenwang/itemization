import HoverThumbnail from "./hover-thumbnail";
import { Component } from "@/app/lib/items/item.types";
import Thumbnail from "./thumbnail";
import WeaponThumbnailList from "./weapon-thumbnail-list";

interface ThumbnailListProps {
  data: Component[];
}

export default function ThumbnailList({ data }: ThumbnailListProps) {
  const sortedData = [...data].sort((a, b) =>
    a.component.id.localeCompare(b.component.id),
  );

  const allItems: Component[] = [];
  const weapons = sortedData.reduce((map, item) => {
    const { itemType, id, name } = item.component;
    if (itemType === "Weapon") {
      const truncatedId = id.slice(0, id.lastIndexOf("-"));
      const truncatedName = name.slice(0, name.lastIndexOf(" "));

      if (!map.has(truncatedId)) {
        map.set(truncatedId, []);
        allItems.push({
          ...item,
          component: {
            ...item.component,
            id: truncatedId,
            name: truncatedName,
          },
        });
      }
      map.get(truncatedId)!.push(item);
    } else {
      if (!map.has(itemType)) {
        map.set(itemType, []);
      }
      map.get(itemType)!.push(item);
      allItems.push(item);
    }
    return map;
  }, new Map<string, Component[]>([]));

  return (
    <>
      {allItems.map((component) => {
        if ([...weapons.keys()].includes(component.component.id)) {
          return (
            <WeaponThumbnailList
              key={`${component.component.id}-base`}
              data={weapons.get(component.component.id)!}
            >
              <Thumbnail
                rarity={component.component.rarity}
                src={component.component.icon}
                type={component.component.itemType}
                alt={`${component.component.name}-base logo`}
                quantity={"+"}
                sizes="(max-width: 100px), (max-width: 100px)"
              />
            </WeaponThumbnailList>
          );
        } else {
          return (
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
          );
        }
      })}
    </>
  );
}
