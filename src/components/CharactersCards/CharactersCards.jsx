import styles from "./charactersCards.module.scss";
import { CharacterCard } from "..";

export const CharactersCards = ({ characters }) => {
  if (!Array.isArray(characters)) return;
  return (
    <section className={styles.cards}>
      {characters.map((character) => (
        <CharacterCard character={character} key={character.id} />
      ))}
    </section>
  )

};
