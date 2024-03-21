import styles from "./header.module.scss";
import { Link } from "@mui/material";
import { Logo, Nav } from "../";

const links = [
  {
    text: "Characters",
    url: "#",
  },
  {
    text: "Locations",
    url: "#",
  },
  {
    text: "Episodes",
    url: "#",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="./">
          <Logo />
          <span className={styles.hiddenText}>Главная страница</span>
        </Link>

        <Nav links={links} />
      </div>
    </header>
  );
}
