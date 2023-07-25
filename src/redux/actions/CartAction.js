export const ADD_TO_CART = "ADD_TO_CART";

export function addToCart(item) {
  return { type: ADD_TO_CART, payload: { ...item, quantity: 1 } };
}

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export function clear_cart() {
  return { type: "CLEAR_CART" };
}

export function incrementQuantity(id) {
  return { type: "INCREMENT_QUANTITY", payload: id };
}

export function decrementQuantity(id) {
  return { type: "DECREMENT_QUANTITY", payload: id };
}
