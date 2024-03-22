import styles from "./mainLocations.module.scss";
import { useState } from "react";
import { TEST_DATA_LABEL } from "./constants";
import {
  Hero,
  FilterInput,
  SelectField,
  LocationsCards,
  LoadMoreButton,
  FiltersModal,
} from "..";

const testDataPlanet = {
  locationName: "Earth (C-137)",
  dimension: "Planet",
};

let testArray = [];
for (let i = 0; i < 12; i++) {
  testArray.push(testDataPlanet);
}

export function MainLocations() {
  const selectInputs = TEST_DATA_LABEL.map((item) => (
    <li
      key={item.label}
      className={`${styles.filterItem} ${styles.filterSelect}`}
    >
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
        <LocationsCards locations={testArray} />
      </section>
      <div className={styles.loadMoreButton}>
        <LoadMoreButton />
      </div>
    </main>
  );
}
