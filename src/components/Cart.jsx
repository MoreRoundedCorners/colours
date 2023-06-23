import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART } from "../redux/actions/CartAction";
import { Link } from "react-router-dom";

const Cart = ({ counter }) => {
  const selector = useSelector((state) => state.cart);
  const clothesInCart = selector.cart;

  console.log("clothesInCart", clothesInCart);

  const dispatch = useDispatch();

  // create a function to remove item from cart
  const handleRemove = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
    console.log("id", id);
  };

  const cartTotal = clothesInCart.reduce((acc, curr) => {
    const price = Number(curr.price.replace("$", ""));
    return acc + price;
  }, 0);

  console.log("selector", selector);
  return (
    <div>
      {clothesInCart.map((cloth) => (
        <div
          key={cloth.id}
          className="flex justify-between items-center m-6 border rounded-3xl p-2"
        >
          <div className="flex p-2">
            <img
              src={cloth.path}
              alt="clothing item"
              className="h-40 w-40 object-cover"
            />
            <div className="flex flex-col mx-auto justify-center">
              <p>{cloth.name}</p>
              <p>{cloth.price}</p>
              <p>{cloth.size}</p>
            </div>
          </div>
          <div className="flex flex-row">
            <button className="p-2" onClick={() => handleRemove(cloth.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div
        className={`flex ${
          clothesInCart.length > 0
            ? "mr-10 items-center justify-end"
            : "justify-center items-center mx-auto h-screen"
        }`}
      >
        {clothesInCart.length > 0 ? (
          <>
            <p className="p-2">{cartTotal}$</p>
            {/* <Link to="/checkout">
              <button className=" p-1">Checkout</button>
            </Link> */}
          </>
        ) : (
          <p className="text-xl justify-center items-center mx-auto">
            Your cart is empty! Click{" "}
            <Link className="text-red-500 font-semibold underline" to={"/shop"}>
              Here
            </Link>{" "}
            to shop
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
