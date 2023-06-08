import React from "react";
import { useNavigate } from "react-router-dom";
import { selectCloth } from "../redux/actions/ClotheAction";
import { useDispatch } from "react-redux";

const ClothesEle = ({ clothes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (cloth) => {
    dispatch(selectCloth(cloth));
    navigate("/EachClothe");
  };
  return clothes.map((clothe) => (
    <div
      onClick={() => handleClick(clothe)}
      className="flex flex-col p-2 m-6 border-neutral-300 rounded-3xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-center align-center justify-center cursor-pointer transition-transform duration-500 ease-out hover:scale-110 "
      key={clothe.id}
    >
      <div className="flex items-center justify-center mx-auto">
        <img
          src={clothe.path}
          alt={clothe.alt}
          className="object-contain h-48"
        />
      </div>
      <div className="flex flex-col">
        <p>{clothe.desc}</p>
        <p>{clothe.price}</p>
      </div>
    </div>
  ));
};

export default ClothesEle;
