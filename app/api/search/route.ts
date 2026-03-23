import { fetchApiSearch } from "@/app/lib/items/item.api";

export async function GET(req: Request) {
  const term = new URL(req.url).searchParams.get("term");

  // if (!term) {
  //   return Response.json({ error: "Missing search term" }, { status: 400 });
  // }

  if (term && term.length < 3) {
    return Response.json(
      { error: "Search term must be at least 3 characters" },
      { status: 400 },
    );
  }

  const res = await fetchApiSearch(term || "");

  if (!res) {
    console.error("No items found");
  }

  return Response.json(res);
}
