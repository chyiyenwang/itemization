import { getItem } from "@/app/lib/items/item.service";
import Card from "@/app/components/card/card";
import Thumbnail from "@/app/components/thumbnail/thumbnail";
import ThumbnailLink from "@/app/components/thumbnail/thumbnail-link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { Component } from "@/app/lib/items/item.types";
import Accordion from "@/app/components/accordion/accordion";

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
    {data
      ?.sort((a, b) => a.component.id.localeCompare(b.component.id))
      .map((component: any) => (
        <div
          key={component.component.id}
          className={styles["thumbnail-wrapper"]}
        >
          <ThumbnailLink
            href={`/items/${component.component.id}`}
            rarity={component.component.rarity}
            alt={component.component.name}
            src={component.component.icon}
            type={component.component.itemType}
          />
        </div>
      ))}
  </>
);

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) return notFound();

  return (
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
          header="RECYCLED COMPONENTS"
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
  );
}
