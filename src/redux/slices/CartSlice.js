import { configureStore, combineReducers } from "@reduxjs/toolkit";

const initialCartState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

// Define your cart reducer
export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        total: state.total - action.payload.price,
      };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  cart: cartReducer,
});
