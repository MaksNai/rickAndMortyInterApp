import styles from "./main.module.scss";
import { Hero } from "../Hero/Hero";

export function Main() {
  return (
    <main classList={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage}/>
      </div>
    </main>
  );
}
