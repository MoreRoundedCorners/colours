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
      <div className="relative flex group ">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-0 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

        <img
          src="../../public/images/osean.webp"
          className=" object-cover w-screen h-scree mx-aut"
        />
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
