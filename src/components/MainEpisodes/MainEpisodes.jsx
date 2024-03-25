import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./mainEpisodes.module.scss";
import {
  fetchEpisodes,
  setFilter,
  selectFilters,
  selectFilteredEpisodes,
  selectAllEpisodes,
} from "../../store/episodeSlice";
import { ITEMS_PER_PAGE } from "./constants";
import { Hero, FilterInput, LoadMoreButton, EpisodesCards } from "..";

export function MainEpisodes() {
  const dispatch = useDispatch();
  const characters = useSelector(selectFilteredEpisodes);
  const allCharacters = useSelector(selectAllEpisodes);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const episodeLoading = useSelector((state) => state.episode.loading);

  useEffect(() => {
    if (episodeLoading === "idle") {
      dispatch(fetchEpisodes());
    }
  }, [episodeLoading, dispatch]);

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Hero className={styles.heroImage} type="rickAndMorty" />
      </div>
      <ul className={styles.filterList}>
        <li className={styles.filterField} key={Date.now()}>
          <FilterInput
            filterName="name"
            text="Filter by name or episode (ex. S01 or S01E02)"
            action={selectFilters}
          />
        </li>
      </ul>
      <section>
        {/* <EpisodesCards episodes={testArray} /> */}
      </section>
      <div className={styles.loadMoreButton}>
        <LoadMoreButton />
      </div>
    </main>
  );
}
