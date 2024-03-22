import styles from "./mainLocations.module.scss";
import { TEST_DATA_LABEL, TEST_ARRAY } from "./constants";
import {
  Hero,
  FilterInput,
  SelectField,
  LocationsCards,
  LoadMoreButton,
  FiltersModal,
} from "..";

export function MainLocations() {
  const selectInputs = TEST_DATA_LABEL.map((item) => (
    <li key={item.label} className={styles.filterSelect}>
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
  ));

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} type="circle" />
      </div>

      <ul className={styles.filterList}>
        <li
          className={`${styles.filterItem} ${styles.filterField}`}
          key={Date.now()}
        >
          <FilterInput />
        </li>
        {selectInputs}
      </ul>

      <div className={styles.advancedFiltersButton}>
        <FiltersModal modalData={TEST_DATA_LABEL} />
      </div>

      <section>
        <LocationsCards locations={TEST_ARRAY} />
      </section>
      <div className={styles.loadMoreButtonContainer}>
        <div className={styles.loadMoreButton}>
          <LoadMoreButton />
        </div>
      </div>
    </main>
  );
}
