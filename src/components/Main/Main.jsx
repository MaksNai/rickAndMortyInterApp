import styles from "./main.module.scss";
import { Hero, FilterInput, SelectField } from "../";

export function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} />
      </div>
      <div className={styles.filterGroup}>
        <FilterInput></FilterInput>
        <SelectField props={{
          label: "Species",
          items: ['Human', 'Alien']
        }}></SelectField>
        <SelectField props={{
          label: "Gender",
          items: ['Male', 'Female']
        }}></SelectField>
        <SelectField props={{
          label: "Status",
          items: ['Dead', 'Alive']
        }}></SelectField>
      </div>
    </main>
  );
}
