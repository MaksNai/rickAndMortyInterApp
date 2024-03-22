import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';

import styles from "./filtersModal.module.scss";

import { FilterInput, SelectField } from "..";

export function FiltersModal({ modalData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ bgcolor: "background.paper", boxShadow: 24, p: 4 }}
          className={styles.modalBox}
        >
           <Typography id="modal-modal-title" variant="h6" component="h2">
           Filters
          </Typography>
          <div>
            {" "}
            <ul className={styles.modalList}>
              <li
                className={`${styles.filterItem} ${styles.filterField}`}
                key={Date.now()}
              >
                <FilterInput />
              </li>
              {modalData.map((item) => (
                <li key={item.label} className={styles.filterItem}>
                  <SelectField
                    sx={{
                      margin: "0",
                      size: ''
                    }}
                    props={{
                      label: item.label,
                      items: item.items,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
