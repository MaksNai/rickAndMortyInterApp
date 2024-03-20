import { Link } from '@mui/material'
import styles from './nav.module.scss'

export function Nav({ links }) {
  const linksList = links.map((link) => {
    return (
      <li key={Date.now() + Math.random()}>
        <Link underline="none" href={link.url} color="black" className={styles.link}>
          {link.text}
        </Link>
      </li>
    )
  })

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>{linksList}</ul>
    </nav>
  )
}
