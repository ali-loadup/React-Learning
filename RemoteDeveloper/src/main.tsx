import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchTextContextProvider } from "./context/searchTextContextProvider.tsx";
import { JobItemsContextProvider } from "./context/jobItemsContextProvider.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
