import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./mainCharacters.module.scss";

import { getUniqueValues } from "../../helpers/helpers";
import { ITEMS_PER_PAGE_INITIAL} from "./constants";
import {
  fetchCharacters,
  setCharacterFilter,
  selectCharactersFilters,
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



export function MainCharacters() {
  const dispatch = useDispatch();
  const characters = useSelector(selectFilteredCharacters);
  const allCharacters = useSelector(selectAllCharacters);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_INITIAL);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = useSelector((state) => state.characters.maxPage)
  const characterLoading = useSelector((state) => state.characters.loading);

  useEffect(() => {
    dispatch(fetchCharacters({ page: currentPage }));
  }, [dispatch, currentPage]);

  const statusOptions = useMemo(
    () => getUniqueValues(allCharacters, "status"),
    [allCharacters],
  );
  const speciesOptions = useMemo(
    () => getUniqueValues(allCharacters, "species"),
    [allCharacters],
  );
  const genderOptions = useMemo(
    () => getUniqueValues(allCharacters, "gender"),
    [allCharacters],
  );

  const handleLoadMoreClick = (e) => {
    e.preventDefault()
    setCurrentPage(currentPage + 1);
    setItemsPerPage(itemsPerPage + ITEMS_PER_PAGE_INITIAL);
  };
   
  const selectFilterLabels = useMemo(
    () => [
      { label: "Species", items: speciesOptions, action: setCharacterFilter },
      { label: "Gender", items: genderOptions, action: setCharacterFilter },
      { label: "Status", items: statusOptions, action: setCharacterFilter },
    ],
    [statusOptions, speciesOptions, genderOptions],
  );

  const content = useMemo(() => {
    return characters.length > 0 ? (
      <CharactersCards characters={characters.slice(0, itemsPerPage)} />
    ) : (
      characterLoading === "succeeded" ? <section className={styles.loading}>
      <p>Nothing found. Try other filters.</p>
    </section> : 
      <section className={styles.loading}>
        <Loading />
      </section>
    );
  }, [characters, itemsPerPage]);
  

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
            action={selectCharactersFilters}
            type="characters"
          />
        </li>
        {selectFilterLabels.map((selectItem) => (
          <li className={styles.filterSelect}>
            <SelectField
              props={{
                label: selectItem.label,
                items: selectItem.items,
                filterName: selectItem.label.toLowerCase(),
                action: selectItem.action,
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
        <section className={styles.contentCard}>{content}</section>
      )}
      <div
        className={styles.loadMoreButtonContainer}
        onClick={handleLoadMoreClick}
      >
           {currentPage <= maxPage && <LoadMoreButton />}
      </div>
    </main>
  );
}
