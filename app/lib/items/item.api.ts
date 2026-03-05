import * as items from "@/app/data";

export async function fetchApiItem(id: string): Promise<any | null> {
  // fake API call - find item from local data
  // return Object.values(items).find((item) => item.id === id);

  const res = await fetch(
    `https://metaforge.app/api/arc-raiders/items?id=${id}&includeComponents=true`,
    {
      cache: "force-cache",
      next: { revalidate: 60 * 60 },
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch item:", res.statusText);
    return null;
  }

  return (await res.json()).data[0];
}
