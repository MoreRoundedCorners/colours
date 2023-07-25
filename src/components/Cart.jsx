import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  decrementQuantity,
  incrementQuantity,
} from "../redux/actions/CartAction";
import { Link } from "react-router-dom";

const Cart = ({ counter }) => {
  const [quantity, setQuantity] = useState(1);

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
    return acc + price * curr.quantity;
  }, 0);

  const cartQuantity = clothesInCart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  console.log("selector", selector);
  return (
    <div>
      <p className="text-center text-3xl pt-8">Shopping cart</p>
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
          <div className="flex">
            <div className="flex flex-row">
              <button
                className="p-2"
                onClick={() => dispatch(decrementQuantity(cloth.id))}
              >
                -
              </button>
              <p className="p-2">{cloth.quantity}</p>
              <button
                className="p-2"
                onClick={() => dispatch(incrementQuantity(cloth.id))}
              >
                +
              </button>
            </div>
            <div className="flex flex-row">
              <button className="p-2" onClick={() => handleRemove(cloth.id)}>
                <img src="../images/trash.png" className="h-6 object-contain" />
              </button>
            </div>
          </div>{" "}
          {/* This is where the missing closing div tag should be */}
        </div>
      ))}

      <div
        className={`${
          clothesInCart.length > 0
            ? "mr-10 items-center justify-end flex flex-row"
            : "justify-center items-center mx-auto h-screen"
        }`}
      >
        {clothesInCart.length > 0 ? (
          <div className="flex flex-col items-center">
            <p className="p-2">Total: {cartTotal}$</p>
            <Link to="/checkout">
              <button className="border p-2 bg-black text-white">
                Checkout
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center m-10">
            <p className="text-xl justify-center items-center mx-auto">
              Your cart is empty! Click{" "}
              <Link
                className="text-red-500 font-semibold underline"
                to={"/shop"}
              >
                Here
              </Link>{" "}
              to shop
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
