import styles from './locationsCards.module.scss'
import { LocationCard } from '..'

export function LocationsCards({ locations }) {
    const locationsArray = locations.map((location) => (
      <LocationCard location={location} />
    ));
    return <section className={styles.cards}>{locationsArray}</section>;
  }
  