export const ADD_TO_CART = "ADD_TO_CART";

export function addToCart(item) {
  return { type: ADD_TO_CART, payload: item };
}

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
