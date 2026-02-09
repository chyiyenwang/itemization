import { getItem } from "@/app/lib/items/item.service";
import Card from "@/app/components/card/card";
import { notFound } from "next/navigation";

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
    <div>
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
  );
}
