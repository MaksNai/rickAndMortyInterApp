import styles from "./mainLocations.module.scss";
import { TEST_DATA_LABEL, TEST_ARRAY } from "./constants";
import {
  Hero,
  FilterInput,
  SelectField,
  LocationsCards,
  LoadMoreButton
} from "..";



export function MainLocations() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} type="circle" />
      </div>
      <ul className={styles.filterList}>
        <li className={`${styles.filterItem} ${styles.filterField}`} key={Date.now()}>
          <FilterInput />
        </li>
        {TEST_DATA_LABEL.map((item) => (
          <li key={item.label} className={styles.filterItem}>
            <SelectField
              sx={{
                maxWidth: "240",
                margin: "0",
              }}
              props={{
                label: item.label,
                items: item.items,
              }}
            />
          </li>
        ))}
      </ul>
      <section>
        <LocationsCards locations={TEST_ARRAY}/>
      </section>
      <div className={styles.loadMoreButton}>
        <LoadMoreButton />
      </div>
    </main>
  );
}
