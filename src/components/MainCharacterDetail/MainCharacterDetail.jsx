import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from "./mainCharacterDetail.module.scss";
import { fetchCharacters } from "../../store/characterSlice";
import { INFORMATION_FIELDS } from './constants'

export const MainCharacterDetail = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [nameCharacter, setNameCharacter] = useState("");
  const dispatch = useDispatch();
  const { characterId } = useParams();
  const characterLoading = useSelector((state) => state.characters.loading);
  useEffect(() => {
    if (characterLoading === "idle") {
      dispatch(fetchCharacters());
    }
  }, [characterLoading, dispatch]);
  const character = useSelector((state) =>
    state.characters.entities.find((char) => char.id.toString() === characterId)
  );

  useEffect(() => {
    if (characterLoading === "succeeded" && character) {
      setImageSrc(character.image);
      setNameCharacter(character.name);
    }
  }, [characterLoading, character]);

  let informationContent;
  if (characterLoading === "succeeded" && typeof character !== "undefined") {
    let itemClass = `${styles.informationItem}`;
    informationContent = INFORMATION_FIELDS.map((item) => {
      const ddKey =
        typeof character[item] === "object"
          ? character[item].name || item
          : character[item];
      if (character[item]) {
        const ddItem =
          typeof character[item] === "object" ? (
            character[item].url ? (
              <Link to={character[item].name}>{character[item].name}</Link>
            ) : (
              character[item].name
            )
          ) : (
            character[item]
          );
      if(character[item].name) itemClass = `${styles.informationItem} ${styles.linkedItem}`;
      console.log(character[item])
          
        return (
          <>
            <div className= {`${itemClass}`}>
              <dt className={styles.dt} key={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </dt>
              <dd className={styles.dd} key={ddKey}>
                {ddItem || "Unknown"}
              </dd>
            </div>
          </>
        );
      }
    });
  }

  const mainCharacterInfo = character ? (
    <>
      <img src={imageSrc} className={styles.image} alt={character.name}/>
      <h1 className={styles.name}>{nameCharacter}</h1>
    </>
  ) : (
    <div className={styles.error}>Character not found</div>
  );

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <nav className={styles.nav}>
          <Link to="/characters" className={styles.link}>
            <ArrowBackIcon />
            Go back
          </Link>
        </nav>
        <div className={styles.charactersInfo}>{mainCharacterInfo}</div>
      </div>
      <section className={styles.information}>
        <section className={styles.informationSection}>
          <h3 className={styles.title}>Informations</h3>
          <dl>{informationContent}</dl>
        </section>

        <section className={styles.informationSection}>
          <h3 className={styles.title}>Episodes</h3>
        </section>
      </section>
    </main>
  );
};
