import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import Hotels from "./pages/Hotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Home Page</p>,
  },
  {
    path: "/search",
    element: <Search />,
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
      {
        path: "/hotels",
        element: <Hotels />,
      },
      {
        path: "/edit-hotel/:hotelId",
        element: <EditHotel />
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
