import Link from "next/link";
import Input from "../input/input";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Arc Raiders</h1>
      <span className={styles.searchbar}>
        <Input />
      </span>
      <span className={styles.navigation}>
        <Link href="/items">
          <h2>Items</h2>
        </Link>
      </span>
    </div>
  );
}
