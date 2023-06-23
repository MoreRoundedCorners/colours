import React, { useState, useEffect } from "react";
import ClothesEle from "./ClothesEle";
import { ClothesArr } from "../utils/ClothesArr";

const MostPopular = () => {
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
    <div className="p-0 mt-0 ">
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-center mx-auto justify-center pb-2">
          Most Popular
        </p>
        <div className="relative lg:block flex lg:mx-0 mx-auto">
          <select
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            className="bg-neutral-900 text-gray-300 px-6 py-3 text-sm rounded-lg outline-none sm:mt-0 float-right"
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

export default MostPopular;
