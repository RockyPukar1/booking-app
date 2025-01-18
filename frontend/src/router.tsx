import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Home Page</p>,
  },
  {
    path: "/search",
    element: <p>Search Page</p>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/add-hotel",
        element: <AddHotel />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
