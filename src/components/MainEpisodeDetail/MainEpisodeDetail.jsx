import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./mainEpisodeDetail.module.scss";
import { fetchCharactersByIds } from "../../store/characterSlice";
import { GoBackLink, CharacterCard, Loading } from "..";
import { fetchEpisodeById } from "../../store/episodeSlice";

export const MainEpisodeDetail = () => {
  const dispatch = useDispatch();
  const { episodeId } = useParams();
  const episodeLoading = useSelector((state) => state.episodes.loading);

  const episodeInStore = useSelector((state) =>
    state.episodes.entities.find(
      (episode) => episode.id.toString() === episodeId
    )
  );

  const casts = useSelector((state) => state.characters.charactersByIds);

  const currentEpisode = useSelector((state) => state.episodes.currentEpisode);
  const episode = episodeInStore ? episodeInStore : currentEpisode;

  useEffect(() => {
    if (episodeLoading === "idle" && !episodeInStore) {
      dispatch(fetchEpisodeById(episodeId));
    }
  }, [episodeLoading, dispatch, episodeInStore]);

  useEffect(() => {
    if (episodeLoading === "succeeded" && episode && episode.characters) {
      dispatch(fetchCharactersByIds(episode.characters));
    }
  }, [dispatch, episodeLoading, episode]);

  const nameEpisode = useMemo(() => {
    if (episodeLoading === "succeeded" && episode) return episode.name;
  }, [episode, episodeLoading]);

  const episodeNumber = useMemo(() => {
    if (episodeLoading === "succeeded" && episode) return episode.episode;
  }, [episode, episodeLoading]);

  const airDate = useMemo(() => {
    if (episodeLoading === "succeeded" && episode) return episode.air_date;
  }, [episode, episodeLoading]);

  const mainEpisodeInfo = useMemo(
    () =>
      episode ? (
        <>
          <h1 className={styles.name}>{nameEpisode}</h1>
          <dl className={styles.dl}>
            <div className={styles.episodeInfoItem}>
              <dt className={styles.dt}>Episode</dt>
              <dd className={styles.dd}>{episodeNumber}</dd>
            </div>
            <div className={styles.episodeInfoItem}>
              <dt className={styles.dt}>Date</dt>
              <dd className={styles.dd}>{airDate}</dd>
            </div>
          </dl>
        </>
      ) : (
        <div className={styles.error}>Episode not found</div>
      ),
    [episode, nameEpisode, episodeNumber, airDate]
  );

  const castContent = useMemo(
    () =>
      casts && casts.length > 0 ? (
        <>
          {casts.map((cast) => (
            <CharacterCard character={cast} />
          ))}
        </>
      ) : (
        <div className={styles.loading}>< Loading /></div>
      ),
    [casts]
  );

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <nav className={styles.nav}>
          <GoBackLink url="/episodes" />
        </nav>
        <div className={styles.episodesInfo}>{mainEpisodeInfo}</div>
      </div>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Cast</h3>
        <section className={styles.castCards}>{castContent}</section>
      </section>
    </main>
  );
};
