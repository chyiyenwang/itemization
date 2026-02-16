import { getItem } from "@/app/lib/items/item.service";
import { Card } from "@/app/components/card";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { Component } from "@/app/lib/items/item.types";
import Accordion from "@/app/components/accordion/accordion";
import HoverThumbnail from "@/app/components/thumbnail/HoverThumbnail";
import TooltipProvider from "@/app/providers/TooltipProvider";

interface ItemPageProps {
  params: {
    id: string;
  };
}

interface ThumbnailProps {
  data: Component[];
}

const ThumbNails = ({ data }: ThumbnailProps) => (
  <>
    {[...data]
      .sort((a, b) => a.component.id.localeCompare(b.component.id))
      .map((component) => (
        <HoverThumbnail key={component.component.id} data={component} />
      ))}
  </>
);

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) return notFound();

  return (
    <TooltipProvider>
      <div className={styles["item-page"]}>
        <div className={styles.left}>
          <Accordion header="COMPONENTS" count={item.components?.length}>
            <div className={styles.components}>
              {item.components && <ThumbNails data={item.components} />}
            </div>
          </Accordion>
          <Accordion header="USED IN" count={item.usedIn?.length}>
            <div className={styles["used-in"]}>
              {item.usedIn && <ThumbNails data={item.usedIn} />}
            </div>
          </Accordion>
        </div>

        <div className={styles.center}>
          <Card
            name={item.name}
            description={item.description}
            icon={item.icon}
            rarity={item.rarity}
            type={item.itemType}
            area={item.lootArea}
            value={item.value}
            weight={item.statBlock.weight}
            stackSize={item.statBlock.stackSize}
          />
        </div>

        <div className={styles.right}>
          <Accordion
            header="RECYCLES INTO"
            count={item.recycleComponents?.length}
            direction="right"
          >
            <div className={styles["recycle-components"]}>
              {item.recycleComponents && (
                <ThumbNails data={item.recycleComponents} />
              )}
            </div>
          </Accordion>
          <Accordion
            header="RECYCLED FROM"
            count={item.recycleFrom?.length}
            direction="right"
          >
            <div className={styles["recycle-from"]}>
              {item.recycleFrom && <ThumbNails data={item.recycleFrom} />}
            </div>
          </Accordion>
        </div>
      </div>
    </TooltipProvider>
  );
}
