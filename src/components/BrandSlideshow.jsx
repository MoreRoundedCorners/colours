import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrandArr } from "../utils/BrandArr";

export default class BrandSlideShow extends Component {
  render() {
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      autoplay: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "",
    };
    return (
      <div className="">
        <h2 className="text-2xl text-center">Top Designers</h2>
        <Slider {...settings} className="p-10">
          {BrandArr.map((brand) => (
            <div className="flex justify-center" key={brand.id}>
              <img
                src={brand.path}
                className="h-[500px] object-cover mx-auto rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
