import { getItem } from "@/app/lib/items/item.service";
import { Card } from "@/app/components/card";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { Component } from "@/app/lib/items/item.types";
import Accordion from "@/app/components/accordion/accordion";
import ThumbnailList from "@/app/components/thumbnail/thumbnail-list";
import TooltipProvider from "@/app/providers/tooltip-provider";

interface ItemPageProps {
  params: {
    id: string;
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return notFound();
  return (
    <TooltipProvider>
      <main className={styles["item-page"]}>
        <div className={styles.left}>
          <Accordion header="COMPONENTS" count={item.components?.length}>
            <div className={styles.components}>
              {item.components && <ThumbnailList data={item.components} />}
            </div>
          </Accordion>
          <Accordion header="USED IN" count={item.usedIn?.length}>
            <div className={styles["used-in"]}>
              {item.usedIn && <ThumbnailList data={item.usedIn} />}
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
                <ThumbnailList data={item.recycleComponents} />
              )}
            </div>
          </Accordion>
          <Accordion
            header="RECYCLED FROM"
            count={item.recycleFrom?.length}
            direction="right"
          >
            <div className={styles["recycle-from"]}>
              {item.recycleFrom && <ThumbnailList data={item.recycleFrom} />}
            </div>
          </Accordion>
        </div>
      </main>
    </TooltipProvider>
  );
}
