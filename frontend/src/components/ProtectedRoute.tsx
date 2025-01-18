import { Outlet } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAppContext();
  
  if (isLoggedIn) {
    return <Outlet />;
  }
  return null;
}
