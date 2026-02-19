import Link from "next/link";
import Image from "next/image";
import SearchBar from "../search-bar/search-bar";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
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
          <div className={styles.title}>
            <h4>ARC</h4>
            <h4>Raiders</h4>
          </div>
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
    </header>
  );
}
