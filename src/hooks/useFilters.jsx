import { useDispatch } from "react-redux";
import { setFilter, resetFilters } from "../store/characterSlice";
import { setFilter as locationSetFilter, resetFilters as locationResetFilters} from "../store/locationsSlice";

export const useFilters = (type = 'characterFilters') => {
  const filterFunction = type === 'characterFilters' ? setFilter : locationSetFilter
  const resetFilterFunction = type === 'locationsFilters' ? resetFilters : locationResetFilters
  const dispatch = useDispatch();

  const updateFilter = (filterName, value) => {
    dispatch(filterFunction({ filterName, value }));
    const currentFilters =
      JSON.parse(localStorage.getItem(type)) || {};

    currentFilters[filterName] = value;
    localStorage.setItem(type, JSON.stringify(currentFilters));
  };

  const resetAllFilters = () => {
    dispatch(resetFilterFunction()); 
    localStorage.removeItem(type); 
  };

  return { updateFilter, resetAllFilters };
};