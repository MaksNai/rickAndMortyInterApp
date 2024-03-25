import { useDispatch } from "react-redux";
import { setFilter, resetFilters } from "../store/characterSlice";

export const useFilters = () => {
  const dispatch = useDispatch();

  const updateFilter = (filterName, value) => {
    dispatch(setFilter({ filterName, value }));
    const currentFilters =
      JSON.parse(localStorage.getItem("characterFilters")) || {};

    currentFilters[filterName] = value;
    localStorage.setItem("characterFilters", JSON.stringify(currentFilters));
  };

  const resetAllFilters = () => {
    dispatch(resetFilters()); 
    localStorage.removeItem("characterFilters"); 
  };

  return { updateFilter, resetAllFilters };
};