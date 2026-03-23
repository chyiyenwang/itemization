type Item = {
  id: string;
  name: string;
};

interface LocalStorageItem {
  value: Item[];
  expiry: number;
}

const localStorageCache = {
  getCache(key: string) {
    const itemKey = localStorage.getItem(key);
    if (!itemKey) {
      return [];
    }

    const item: LocalStorageItem = JSON.parse(itemKey);
    if (!item) {
      console.log("!item");
      return [];
    }

    if (typeof window === "undefined") {
      console.log("undefined window");
      return [];
    }

    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return [];
    }

    return item.value;
  },

  setCache(key: string, value: Item[]) {
    if (typeof window === "undefined") return;
    const item: LocalStorageItem = {
      value,
      expiry: Date.now() + 1000 * 60 * 60, // 1 hour expiry
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  removeCache(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

export default localStorageCache;
