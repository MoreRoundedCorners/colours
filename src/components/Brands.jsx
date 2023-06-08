import React from "react";
import { useInView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrandSlideShow from "./BrandSlideshow";
import Shop from "./Shop";

export const Brands = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div
      className={`my-element ${
        inView ? "in-view p-10 mt-10 h-full" : "text-white "
      }`}
      ref={ref}
    >
      <Shop />
      {/* <BrandSlideShow /> */}
    </div>
  );
};
