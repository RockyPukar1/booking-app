import { useContext } from "react";
import { AppContext, IAppContext } from "../contexts/AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as IAppContext;
};