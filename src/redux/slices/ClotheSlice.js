import { configureStore, combineReducers } from "@reduxjs/toolkit";

const initialCartState = {
  cart: [],
  total: 0,
};

const initialClothState = {
  selectedCloth: null,
};

// Define your cloth reducer
export const clothReducer = (state = initialClothState, action) => {
  switch (action.type) {
    case "SELECT_CLOTH":
      return { ...state, selectedCloth: action.payload };
    default:
      return state;
  }
};

// Combine reducers
export const rootReducer = combineReducers({
  cloth: clothReducer,
});
