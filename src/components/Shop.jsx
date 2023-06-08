import React, { useState, useEffect } from "react";
import ClothesEle from "./ClothesEle";
import { ClothesArr } from "../utils/ClothesArr";

const Shop = () => {
  // State for the currently selected clothing type
  const [selectedType, setSelectedType] = useState("");

  // State for the filtered clothing items
  const [filteredClothes, setFilteredClothes] = useState(ClothesArr);

  // Derive a unique list of clothing types
  const uniqueTypes = Array.from(
    new Set(ClothesArr.map((clothe) => clothe.type))
  );

  const [selectedClothe, setSelectedClothe] = useState(null);

  // Update the filtered clothing items when the selection changes
  useEffect(() => {
    if (selectedType === "") {
      setFilteredClothes(ClothesArr);
    } else {
      setFilteredClothes(
        ClothesArr.filter((clothe) => clothe.type === selectedType)
      );
    }
  }, [selectedType]);

  return (
    <div className="p-10">
      <div className="flex float-right">
        <select
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
          className="bg-neutral-900 text-gray-300 px-6 py-3 text-sm rounded-lg outline-none sm:mt-0 "
        >
          <option value="">All</option>
          {/* Iterate over the unique list of clothing types */}
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center">
        <p className="mx-auto text-2xl font-semibold">Shop</p>
      </div>
      <div className="flex flex-wrap justify-center">
        <ClothesEle
          clothes={filteredClothes}
          setSelectedClothe={setSelectedClothe}
        />
      </div>
    </div>
  );
};

export default Shop;
