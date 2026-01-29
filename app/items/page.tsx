export default async function ItemsPage() {
  const data = await fetch("https://metaforge.app/api/arc-raiders/items?limit=10&includeComponents=true", {
    cache: 'force-cache'
  });
  const items = await data.json();
  console.log(items);
  return (
    <div>
      <h1>Items</h1>
    </div>
  )
}