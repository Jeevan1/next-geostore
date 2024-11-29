"use client";
import React from "react";
import SectionHeading from "../SectionHeading";
import ProductCard from "../ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SecondaryButton } from "../Button";

const Arrow = ({ className, style, onClick, direction }: any) => (
  <div
    className={`absolute top-1/2 z-10 left-${direction === "prev" ? "10px" : "auto"} right-${direction === "next" ? "30px" : "auto"} ${className}`}
    style={{
      ...style,
      display: "block",
      position: "absolute",
      top: "50%",
      // left: direction === "next" ? "auto" : "0px",
      // right: direction === "next" ? "0px" : "auto",
      zIndex: 1,
      transform: direction === "prev" ? "rotate(180deg)" : "rotate(0deg)",
    }}
    onClick={onClick}
    aria-label={direction === "next" ? "Next Slide" : "Previous Slide"}
  >
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
);

const Products = ({
  products = [],
  title,
  description,
}: {
  products: { id: number; title: string; price: number; imageUrl: string }[];
  title?: string;
  description?: string;
}) => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true, // Fixed typo
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <SectionHeading title={title || "Products"} description={description} />
        {products.length > 0 ? (
          <Slider {...settings} className="mx-0 h-full sm:-mx-2  md:-mx-3">
            {products.map((product) => (
              <div className="sm:px-1" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        ) : (
          <div>
            <p className="text-center text-lg font-semibold text-red-400">
              No products found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
