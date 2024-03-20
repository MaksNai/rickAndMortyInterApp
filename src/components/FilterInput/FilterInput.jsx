import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import styles from "./filterInput.module.scss";

export function FilterInput() {
  return (
    <label className={styles.label}>
      <SearchIcon className={styles.icon} />
      <InputBase
        id="filterNameCharacter"
        placeholder="Filter by name or episode (ex. S01 or S01E02)"
        className={styles.input}
        sx={{
            width: "100%",
        }}
      ></InputBase>
    </label>
  );
}
