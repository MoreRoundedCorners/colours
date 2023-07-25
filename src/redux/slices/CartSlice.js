import { configureStore, combineReducers } from "@reduxjs/toolkit";

const initialCartState = {
  cart: [],
  total: 0,
};

const parsePrice = (price) => Number(price.replace(/\D/g, ""));

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + parsePrice(action.payload.price),
      };
    case "REMOVE_FROM_CART":
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
          total:
            state.total -
            parsePrice(itemToRemove.price) * itemToRemove.quantity, //consider quantity while removing
        };
      }
      return state;
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        total: 0,
      };
    case "INCREMENT_QUANTITY":
      const itemToIncrement = state.cart.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrement) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + parsePrice(itemToIncrement.price),
        };
      }
      return state;
    case "DECREMENT_QUANTITY":
      const itemToDecrement = state.cart.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        //make sure item quantity is greater than 1
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          total: state.total - parsePrice(itemToDecrement.price),
        };
      }
      return state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  cart: cartReducer,
});
