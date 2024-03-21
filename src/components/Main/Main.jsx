import styles from "./main.module.scss";
import { Hero, FilterInput, SelectField, CharacterCards } from "../";

const testDataLabel = [
  { label: "Species", items: ["Human", "Alien"] },
  { label: "Gender", items: ["Male", "Female"] },
  { label: "Status", items: ["Dead", "Alive"] },
];

const testDataCharacter = {
  img: "./testImage.png",
  characterName: "Rick Sanchez",
  species: "Human",
};

let testArray = [];
for (let i = 0; i < 8; i++) {
  testArray.push(testDataCharacter);
}

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
        {testDataLabel.map((item) => (
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
            ></SelectField>
          </li>
        ))}
      </ul>
      <section className={styles.contentCard}>
        <CharacterCards characters={testArray} />
      </section>
    </main>
  );
}
