import { useState } from "react";
import { useSelector } from "react-redux";

export const EachClothe = () => {
  const selectedCloth = useSelector((state) => state.cloth.selectedCloth);
  const [size, setSize] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="flex items-center animate-slidedown">
      {selectedCloth && (
        <img
          src={selectedCloth.path}
          alt={selectedCloth.alt}
          className="h-[750px] px-40 "
        />
      )}
      <div className="flex flex-col ml-0">
        <p className="text-2xl">{selectedCloth && selectedCloth.desc}</p>
        <p className="text-center text-xl m-2">
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
            src="../../public/misImg/shop.png"
            className="h-8 w-8 object-cover mx-auto mt-2 cursor-pointer mb-2"
          />
        </div>
      </div>
    </div>
  );
};
