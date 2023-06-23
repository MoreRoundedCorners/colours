import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FrontPageImgArr } from "../utils/FrontPageImgArr";
import { useInView } from "react-intersection-observer";
import { Brands } from "./Brands";
import MostPopular from "./MostPopular";

const FrontPage = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <section className="overflow-hidden">
      <div className=" flex mt-[navbar height]">
        <div className=" transition-all duration-1000 opacity-70 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-0 group-hover:duration-200 animate-tilt w-[250px]"></div>

        <img
          src="../../public/images/osean.webp"
          className=" object-contain flex-grow md:h-screen"
        />

        <div className="absolut transition-all duration-1000 opacity-70 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-0 group-hover:duration-200 animate-tilt w-[250px]"></div>
      </div>

      <div
        className={`my-element ${
          inView ? "in-view p-10 mt-10 h-full" : "text-white "
        }`}
        ref={ref}
      >
        <MostPopular />
        {/* <BrandSlideShow /> */}
      </div>
    </section>
  );
};

export default FrontPage;
