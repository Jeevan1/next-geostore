"use client";
import React from "react";
import SectionHeading from "../SectionHeading";
import ProductCard from "../ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SecondaryButton } from "../Button";

const Products = ({
  title,
  description,
}: {
  products?: [];
  title: string;
  description: string;
}) => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinity: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),

    prevArrow: (
      <div>
        <div className="next-slick-arrow rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="py-20 border-dashed">
      <div className="container">
        <SectionHeading title={title} description={description} />
        <div className="slider-wrapper gap-3">
          <Slider {...settings}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Slider>
        </div>
        <div className="text-center mt-10">
          <SecondaryButton>View All Products</SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default Products;
