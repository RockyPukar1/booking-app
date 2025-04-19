import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { router } from "./router";

import { AppContextProvider } from "./contexts/AppContext";
import { SearchContextProvider } from "./contexts/SearchContext";

import Layout from "./layouts/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
