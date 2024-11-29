import React from "react";
import { PrimaryButton } from "./Button";
import image1 from "../../public/assets/img/bg/left-banner-image.jpg";
// import image2 from "../../public/assets/img/bg/right-banner-image-01.jpg";
// import image3 from "../../public/assets/img/bg/right-banner-image-02.jpg";
// import image4 from "../../public/assets/img/bg/right-banner-image-03.jpg";
// import image5 from "../../public/assets/img/bg/right-banner-image-04.jpg";

const BannerStyle = {
  backgroundImage: `url(${image1.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const BannerItem = () => {
  return (
    <div
      className="group relative h-48 w-full cursor-pointer shadow transition-all duration-1000 md:h-60"
      style={BannerStyle}
    >
      <div className="flex h-full flex-col justify-center bg-black bg-opacity-50 p-5 text-center">
        <h1 className="text-lg font-semibold text-white sm:text-xl">
          We Are GeoShop
        </h1>
        <p className="text-sm font-medium text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div className="absolute inset-x-4 inset-y-4 hidden flex-col items-center justify-center bg-black bg-opacity-50 text-center transition-all duration-1000 group-hover:flex">
        <h1 className="mb-2 text-xl font-semibold text-white">Shop Now</h1>
        <PrimaryButton className="text-sm">Shop Now</PrimaryButton>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <section className="border-dashed">
      <div className="container py-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div className="relative basis-1/2 shadow" style={BannerStyle}>
            <div className="flex h-full w-full flex-col items-start justify-center bg-black bg-opacity-50 px-7 py-5">
              <h1 className="text-2xl font-semibold text-white sm:text-2xl md:text-3xl">
                We Are GeoShop
              </h1>
              <p className="my-5 text-sm font-medium text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
                fuga esse aspernatur, aliquid dignissimos magni.
              </p>
              <PrimaryButton className="">Shop Now</PrimaryButton>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="grid grid-cols-2 gap-5">
              <BannerItem />
              <BannerItem />
              <BannerItem />
              <BannerItem />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
