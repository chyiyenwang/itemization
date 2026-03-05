import { Item } from "@/app/types";

export function getRequiredStatBlock(stat: Item["statBlock"] | null) {
  return (
    stat ?? {
      weight: null,
      stackSize: null,
    }
  );
}

const STALE_TIME_DAYS = 7;
export function isStale(lastFetched: Date) {
  if (!lastFetched) return true;
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - STALE_TIME_DAYS);

  return lastFetched < currentDate;
}
