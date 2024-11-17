import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <p>Home Page</p>
      </Layout>
    ),
  },
  {
    path: "/search",
    element: (
      <Layout>
        <p>Search Page</p>
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
