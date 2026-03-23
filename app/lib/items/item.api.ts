import { ApiItem } from "./item.schema";

const BASE_URL = "https://metaforge.app/api/arc-raiders/items";

export async function fetchApiItem(id: string): Promise<ApiItem | null> {
  // fake API call - find item from local data
  // return Object.values(items).find((item) => item.id === id);

  const res = await fetch(`${BASE_URL}?id=${id}&includeComponents=true`, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch item:", res.statusText);
    return null;
  }

  const json = await res.json();

  if (!json?.data?.length) {
    console.error("API returned invalid format");
    return null;
  }

  return json.data[0];
}

export async function fetchApiSearch(query: string) {
  const res = await fetch(
    `${BASE_URL}?minimal=true&limit=10&search=${encodeURIComponent(query)}`,
  );

  if (!res.ok) {
    console.error("Failed to search items:", res.statusText);
    return [];
  }

  const json = await res.json();

  if (!json?.data) {
    console.error("API returned invalid format");
    return [];
  }

  return json.data;
}
