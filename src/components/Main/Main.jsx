import styles from "./main.module.scss";
import { Hero, FilterInput, SelectField, CharacterCards } from "../";

const testData = [
  { label: "Species", items: ["Human", "Alien"] },
  { label: "Gender", items: ["Male", "Female"] },
  { label: "Status", items: ["Dead", "Alive"] },
];

export function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} />
      </div>
      <ul className={styles.filterList}>
        <li className={styles.filterItem} key={Date.now()}>
          <FilterInput />
        </li>
        {testData.map((item) => (
          <li key={item.label}>
            <SelectField
              props={{
                label: item.label,
                items: item.items,
              }}
            ></SelectField>
          </li>
        ))}
      </ul>
      <section className={styles.contentCard}>
        <CharacterCards />
      </section>
    </main>
  );
}
