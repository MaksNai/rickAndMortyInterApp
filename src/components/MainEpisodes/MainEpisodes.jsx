import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./mainEpisodes.module.scss";
import {
  fetchEpisodes,
  selectFilteredEpisodes,
  selectEpisodeFilters,
} from "../../store/episodeSlice";
import { ITEMS_PER_PAGE_INITIAL } from "./constants";
import {
  Hero,
  FilterInput,
  LoadMoreButton,
  EpisodesCards,
  Loading,
  UpToButton,
} from "..";

export function MainEpisodes() {
  const dispatch = useDispatch();

  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_INITIAL);
  const [isUpToButtonVisible, setIsUpToButtonVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);

  const episodes = useSelector(selectFilteredEpisodes);
  const episodeLoading = useSelector((state) => state.episodes.loading);
  const maxPage = useSelector((state) => state.episodes.maxPage);

  const loadMoreRef = useRef(null);
  const heroImage = useRef(null);

  useEffect(() => {
    dispatch(fetchEpisodes({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsUpToButtonVisible(scrollTop > window.innerHeight / 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoadMoreClicked) {
      loadMoreRef.current?.scrollIntoView({ behavior: "smooth" });
      setIsLoadMoreClicked(false);
    }
  }, [episodes.length, episodeLoading, isLoadMoreClicked]);

  const handleUpButtonClick = useCallback(() => {
    heroImage.current?.scrollIntoView({ behavior: "smooth" });
    setIsUpToButtonVisible(false);
  }, []);

  const handleLoadMoreClick = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    setItemsPerPage((prev) => prev + ITEMS_PER_PAGE_INITIAL);
    setIsLoadMoreClicked(true);
  }, []);

  const content = useMemo(() => {
    if (episodeLoading === "loading") {
      return <Loading />;
    }
    if (episodes.length > 0) {
      return <EpisodesCards episodes={episodes.slice(0, itemsPerPage)} />;
    }
    return <p>Nothing found. Try other filters.</p>;
  }, [episodes, itemsPerPage, episodeLoading]);

  return (
    <main className={styles.main}>
      <div className={styles.hero} ref={heroImage}>
        <Hero className={styles.heroImage} type="rickAndMorty" />
      </div>
      <ul className={styles.filterList}>
        <li className={styles.filterField}>
          <FilterInput
            filterName="name"
            text="Filter by name or episode (ex. S01 or S01E02)"
            action={selectEpisodeFilters}
            type="episodes"
          />
        </li>
      </ul>
      <section className={styles.contentCard}>{content}</section>
      {episodeLoading === "loading" && (
        <div className={styles.loadingIndicator}>
          <Loading />
        </div>
      )}
      <div
        ref={loadMoreRef}
        className={styles.loadMoreButtonContainer}
        onClick={handleLoadMoreClick}
      >
        {currentPage <= maxPage && <LoadMoreButton />}
      </div>
      {currentPage > 2 && isUpToButtonVisible && (
        <div className={styles.upToButton} onClick={handleUpButtonClick}>
          <UpToButton />
        </div>
      )}
    </main>
  );
}
