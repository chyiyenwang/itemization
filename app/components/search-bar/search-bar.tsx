"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useOutsideClick from "@/app/hooks/use-outside-click";
import paths from "@/app/paths";

import styles from "./search-bar.module.css";
import localStorageCache from "@/app/lib/local-storage";

type Item = {
  id: string;
  name: string;
};

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleClickCancel = () => {
    setInputValue("");
    setFilteredItems([]);
  };

  useOutsideClick(autocompleteRef, () => {
    setFilteredItems([]);
    setShowAutocomplete(false);
  });

  useEffect(() => {
    inputValue.length > 0
      ? setShowAutocomplete(true)
      : setShowAutocomplete(false);

    const fetchApiSuggestions = async () => {
      const names = await fetch(`/api/search?term=${inputValue}`);
      return await names.json();
    };

    const fetchSuggestions = async () => {
      const cacheKey = `autocomplete:${inputValue}`;
      let suggestions = localStorageCache.getCache(cacheKey);

      if (suggestions?.length === 0 && inputValue.length > 0) {
        suggestions = await fetchApiSuggestions();
      }

      setFilteredItems(suggestions);
      localStorageCache.setCache(cacheKey, suggestions);
    };

    let timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div ref={autocompleteRef} className={styles["input-container"]}>
      <input
        id="item-search"
        type="text"
        placeholder="Search items..."
        autoComplete="off"
        className={[
          styles.input,
          showAutocomplete &&
            filteredItems.length > 0 &&
            styles["input-with-autocomplete"],
        ]
          .filter(Boolean)
          .join(" ")}
        value={inputValue}
        onChange={(e) => handleInputChange(e.currentTarget.value)}
      />
      <span
        className={inputValue.length > 0 ? styles.clear : styles.hide}
        onClick={handleClickCancel}
      >
        &times;
      </span>
      {inputValue?.length > 0 && filteredItems?.length > 0 && (
        <ul
          className={[
            styles.autocomplete,
            showAutocomplete && styles["show-autocomplete"],
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {filteredItems?.map((item) => {
            return (
              <Link
                key={item.id}
                href={paths.itemShow(item.id)}
                onClick={() => setInputValue("")}
              >
                <li className={styles["list-item"]}>{item.name}</li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
}
