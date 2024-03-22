import styles from './filtersModal.module.scss'

export const FiltersModal = ({ isOpen, handleClose }) => {
    return (
      <div className={isOpen ? styles.modalOpen : styles.modalClosed}>
        <button onClick={handleClose}>Close</button>
      </div>
    );
  };