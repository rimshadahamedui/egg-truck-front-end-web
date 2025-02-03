import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes/";
import env from "./utils/config/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { PAYPAL_INITIAL_OPTIONS } from "./constants";
import { InstantSearch } from "react-instantsearch";
import { history } from "instantsearch.js/es/lib/routers";

const searchClient = algoliasearch(
  env.ALGOLIA_APPLICATION_ID,
  env.ALGOLIA_SEARCH_API_KEY
);
const routing = {
  router: history({
    cleanUrlOnDispose: true,
  }),

  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[env.ALGOLIA_INDEX_NAME];
      return {
        q: indexUiState?.query || "",
        category: indexUiState?.refinementList?.["category.name"] || [],
        subcategory: indexUiState?.refinementList?.["subcategory.name"] || [],
        page: indexUiState?.page || 1, // Default page if not present
      };
    },

    routeToState(routeState) {
      return {
        [env.ALGOLIA_INDEX_NAME]: {
          query: routeState.q || "",
          refinementList: {
            "category.name": routeState?.category
              ? [...routeState.category]
              : [],
            "subcategory.name": routeState?.subcategory
              ? [...routeState.subcategory]
              : [],
          },

          sortBy: routeState?.sort || "",
          page: routeState?.page,
        },
      };
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_KEY}>
      <PayPalScriptProvider options={PAYPAL_INITIAL_OPTIONS}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <InstantSearch
              searchClient={searchClient}
              indexName={env.ALGOLIA_INDEX_NAME}
              routing={routing}
              future={{ preserveSharedStateOnUnmount: false }}
            >
              <RouterProvider router={router} />
            </InstantSearch>
          </PersistGate>
        </Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
