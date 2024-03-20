import { useId, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export function SelectField({ props }) {
  const id = useId();
  const idLabel = useId();
  const { label, items } = props;

  const [item, setItem] = useState("");

  const menuItems = items.map((menuItem) => (
    <MenuItem value={menuItem}>{menuItem}</MenuItem>
  ));

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          minWidth: 240,
          borderColor: '#00000061',
          "&:hover": {
            borderColor: "#00000080",
          },
        }}
      >
        <InputLabel id={idLabel}>{label}</InputLabel>
        <Select
          labelId={idLabel}
          id={id}
          value={item}
          onChange={handleChange}
          autoWidth
          label={label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
}
