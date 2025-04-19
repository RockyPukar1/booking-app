import { useContext } from "react";
import { SearchContext, ISearchContext } from "../contexts/SearchContext";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as ISearchContext;
};
