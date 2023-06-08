import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { clothReducer } from "./slices/ClotheSlice";
import { cartReducer } from "./slices/CartSlice";

// Assume cartReducer and clothReducer are defined somewhere else

const rootReducer = combineReducers({
  cart: cartReducer,
  cloth: clothReducer, // new
});

const store = configureStore({ reducer: rootReducer });

export default store;
