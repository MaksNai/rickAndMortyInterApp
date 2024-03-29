import { useId } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "./selectField.module.scss";
import { useFilters } from "../../hooks/useFilters";

export function SelectField({ label, items, filterName, type }) {
  const idSelect = useId();
  const idLabel = useId();

  const { updateFilter, getCurrentFilters } = useFilters(type);

  const currentValue = getCurrentFilters(type)[filterName] || "";

  const handleChange = ({ target }) => {
    const { value } = target;
    updateFilter(filterName, value);
  };

  return (
    <FormControl
      className={styles.select}
      variant="outlined"
      sx={{
        m: 1,
        minWidth: 240,
        margin: 0,
        borderColor: "#00000061",
        "&:hover": {
          borderColor: "#00000080",
        },
      }}
    >
      <InputLabel
        id={idLabel}
        sx={{
          "&:hover": {
            color: "#00000080",
          },
          color: "#00000099",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={idLabel}
        id={idSelect}
        value={currentValue}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items.map((menuItem) => (
          
          <MenuItem value={menuItem || currentValue} key={menuItem || currentValue}>
            {menuItem || currentValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
