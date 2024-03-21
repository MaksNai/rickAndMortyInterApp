import styles from './locationsCards.module.scss'
import { LocationCard } from '..'

export function LocationsCards({ locations }) {
    const locationsArray = locations.map((locations) => (
      <LocationCard locations={locations} />
    ));
    return <section className={styles.cards}>{locationsArray}</section>;
  }
  