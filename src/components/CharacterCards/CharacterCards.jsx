import styles from "./characterCards.module.scss";
import { CharacterCard } from "../";

export function CharacterCards({ characters }) {
  const charactersArray = characters.map((character) => (
    <CharacterCard character={character} />
  ));
  return <section className={styles.cards}>{charactersArray}</section>;
}
