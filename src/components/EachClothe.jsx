import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/CartAction";

export const EachClothe = () => {
  const dispatch = useDispatch();

  const selectedCloth = useSelector((state) => state.cloth.selectedCloth);
  const [size, setSize] = useState("S");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    if (selectedCloth && size) {
      const item = {
        id: selectedCloth.id, // assuming each item has a unique ID
        name: selectedCloth.desc,
        price: selectedCloth.price,
        size: size,
        path: selectedCloth.path,
      };
      dispatch(addToCart(item)); // Dispatch the addToCart action with the item as argument
      console.log("item", item);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center animate-slidedown h-screen">
      {selectedCloth && (
        <div className="px-4 sm:px-10 md:px-20 lg:px-80">
          <img
            src={selectedCloth.path}
            alt={selectedCloth.alt}
            className="object-cover h-auto lg:h-[750px] w-full mx-auto"
          />
        </div>
      )}

      <div className="flex flex-col ml-0">
        <p className="text-2xl tetx-center mx-auto">
          {selectedCloth && selectedCloth.desc}
        </p>
        <p className="text-center text-xl m-2 mx-auto">
          {selectedCloth && selectedCloth.price}
        </p>
        <div className="flex p-2 ">
          <select
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className="bg-neutral-900 text-gray-300 px-6 py-3 text-sm rounded-lg outline-none sm:mt-0 w-22 mx-auto"
          >
            {/* <option value="">All</option> */}
            {/* Iterate over the unique list of clothing types */}
            {sizes.map((eachSize) => (
              <option key={eachSize} value={eachSize}>
                {eachSize}
              </option>
            ))}
          </select>
          <img
            onClick={handleAddToCart}
            src="../../public/misImg/shop.png"
            className="h-8 w-8 object-cover mx-auto mt-2 cursor-pointer mb-2 "
          />
        </div>
      </div>
    </div>
  );
};
