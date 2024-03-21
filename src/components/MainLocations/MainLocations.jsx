import styles from './mainLocations.module.scss'
import { Hero } from "../";

export function MainLocations() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} type='circle'/>
      </div>
    </main>
  );
}
