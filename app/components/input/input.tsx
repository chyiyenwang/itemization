"use client";

import { useEffect, useState } from "react";
import * as items from "@/app/data";
import Link from "next/link";

import styles from "./input.module.css";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);

  const filteredItems =
    inputValue.length > 0
      ? Object.keys(items).filter((item) => item.includes(inputValue))
      : [];

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    inputValue.length > 0
      ? setShowAutocomplete(true)
      : setShowAutocomplete(false);
  }, [inputValue]);

  return (
    <>
      <div className={styles["input-container"]}>
        <input
          id="item-search"
          type="text"
          placeholder="Search items..."
          className={[
            styles.input,
            showAutocomplete && styles["input-with-autocomplete"],
          ]
            .filter(Boolean)
            .join(" ")}
          value={inputValue}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
        />
        {filteredItems.length > 0 && (
          <ul
            className={[
              styles.autocomplete,
              showAutocomplete && styles["show-autocomplete"],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {filteredItems.map((item) => {
              return (
                <Link
                  key={item}
                  href={`/items/${item}`}
                  onClick={() => setInputValue("")}
                >
                  <li className={styles["list-item"]}>{item}</li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
