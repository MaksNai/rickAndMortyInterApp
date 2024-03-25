import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./mainCharacters.module.scss";
import { ITEMS_PER_PAGE } from "./constants";
import {
  fetchCharacters,
  setFilter,
  selectFilters,
  selectFilteredCharacters,
  selectAllCharacters,
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
import { getUniqueValues } from "./helpers";

export function MainCharacters() {
  const dispatch = useDispatch();
  const characters = useSelector(selectFilteredCharacters);
  const allCharacters = useSelector(selectAllCharacters);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const [statusOptions, setStatusOptions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  const characterLoading = useSelector((state) => state.characters.loading);

  useEffect(() => {
    if (characterLoading === "idle") {
      dispatch(fetchCharacters());
    }
  }, [characterLoading, dispatch]);

  useEffect(() => {
    if (characterLoading === "succeeded") {
      setStatusOptions(getUniqueValues(allCharacters, "status"));
      setSpeciesOptions(getUniqueValues(allCharacters, "species"));
      setGenderOptions(getUniqueValues(allCharacters, "gender"));
    }
  }, [characterLoading, characters]);

  const handleLoadMoreClick = useCallback(() => {
    setItemsPerPage((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const selectFilterLabels = [
    { label: "Species", items: speciesOptions },
    { label: "Gender", items: genderOptions },
    { label: "Status", items: statusOptions },
  ];

  const content = characters.length > 0 ?  <CharactersCards characters={characters.slice(0, itemsPerPage)} /> : <p>Nothing found. Try other filters.</p>

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} />
      </div>
      <ul className={styles.filterList}>
        <li className={`${styles.filterItem} ${styles.filterField}`}>
          <FilterInput
            filterName="name"
            text="Filter by name..."
            action={selectFilters}
          />
        </li>
        {selectFilterLabels.map((selectItem) => (
          <li>
            <SelectField
              props={{
                label: selectItem.label,
                items: selectItem.items,
                filterName: selectItem.label.toLowerCase(),
                action: setFilter,
              }}
            />
          </li>
        ))}
      </ul>
      <div className={styles.advancedFiltersButton}>
        <FiltersModal modalData={selectFilterLabels} />
      </div>
      {characterLoading === "loading" ? (
        <Loading />
      ) : (
        <section className={styles.contentCard}>
         {content}
        </section>
      )}
      <div
        className={styles.loadMoreButtonContainer}
        onClick={handleLoadMoreClick}
      >
        {characters.length > itemsPerPage && (
          <LoadMoreButton onClick={handleLoadMoreClick} />
        )}
      </div>
    </main>
  );
}
