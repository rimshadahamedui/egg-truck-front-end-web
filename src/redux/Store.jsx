import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartReducer from "./slices/CartSlice";
import UserSlice from "./slices/UserSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  cart: CartReducer,
  user: UserSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
let persistor = persistStore(store);

export { store, persistor };
