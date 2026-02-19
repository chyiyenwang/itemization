import Link from "next/link";
import Image from "next/image";
import SearchBar from "../search-bar/search-bar";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.brand}>
        <a href="/">
          <span className={styles["logo-wrapper"]}>
            <Image
              className={styles.logo}
              src="/arc-raiders-logo.webp"
              alt="Arc Raiders Logo"
              width={50}
              height={50}
            />
          </span>
          <h3 className={styles.title}>
            <div>Arc</div>
            <div>Raiders</div>
          </h3>
        </a>
      </span>

      <span className={styles.searchbar}>
        <SearchBar />
      </span>

      <span className={styles.navigation}>
        <Link href="/items">
          <h2>Items</h2>
        </Link>
      </span>
    </div>
  );
}
