import styles from "./main.module.scss";
import { Hero, FilterInput } from "../";

export function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} />
      </div>
      <div className={styles.filterGroup}>
        <FilterInput></FilterInput>
      </div>
    </main>
  );
}
