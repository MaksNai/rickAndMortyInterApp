import styles from "./mainCharacters.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TEST_DATA_LABEL, ITEMS_PER_PAGE } from "./constants";
import {
  selectAllCharacters,
  fetchCharacters,
} from "../../store/characterSlice";
import {
  Hero,
  FilterInput,
  SelectField,
  CharactersCards,
  LoadMoreButton,
  FiltersModal,
  Loading,
} from "..";

export function MainCharacters() {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);

  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const characterLoading = useSelector((state) => state.characters.loading);

  useEffect(() => {
    if (characterLoading === "idle") {
      dispatch(fetchCharacters());
    }
  }, [characterLoading, dispatch]);

  let content;
  switch (characterLoading) {
    case "loading":
      content = (
        <div className={styles.loading}>
          <Loading />
        </div>
      );
      break;
    case "succeeded":
      const charactersPage = characters.slice(0, itemsPerPage);
      content = <CharactersCards characters={charactersPage} />;
      break;
  }

  const handleLoadMoreClick = () => {
    setItemsPerPage(itemsPerPage + ITEMS_PER_PAGE);
  };

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} />
      </div>
      <ul className={styles.filterList}>
        <li
          className={`${styles.filterItem} ${styles.filterField}`}
          key={Date.now()}
        >
          <FilterInput />
        </li>
        {TEST_DATA_LABEL.map((item) => (
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
        ))}
      </ul>
      <div className={styles.advancedFiltersButton}>
        <FiltersModal modalData={TEST_DATA_LABEL} />
      </div>
      <section className={styles.contentCard}>{content}</section>
      {characters.length > itemsPerPage && (
        <div
          className={styles.loadMoreButtonContainer}
          onClick={handleLoadMoreClick}
        >
          <LoadMoreButton />
        </div>
      )}
    </main>
  );
}
