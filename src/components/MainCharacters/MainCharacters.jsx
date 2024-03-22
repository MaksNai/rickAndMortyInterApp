import styles from "./mainCharacters.module.scss";
import { TEST_DATA_LABEL, TEST_ARRAY } from "./constants";
import {
  Hero,
  FilterInput,
  SelectField,
  CharactersCards,
  LoadMoreButton,
  FiltersModal
} from ".."; 

export const MainCharacters = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} />
      </div>
      <ul className={styles.filterList}>
        <li className={`${styles.filterItem} ${styles.filterField}`} key={Date.now()}>
          <FilterInput />
        </li>
        {TEST_DATA_LABEL.map((item) => (
          <li key={item.label} className={`${styles.filterItem} ${styles.filterSelect}`}>
            <SelectField
              sx={{
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
      <div className={styles.advancedFiltersButton}>
        <FiltersModal modalData={TEST_DATA_LABEL} />
      </div>
      <section className={styles.contentCard}>
        <CharactersCards characters={TEST_ARRAY} />
      </section>
      <div className={styles.loadMoreButtonContainer}>
        <LoadMoreButton />
      </div>
    </main>
  );
}
