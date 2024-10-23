import React from "react";
import SectionHeading from "./SectionHeading";
import { FaQuoteLeft } from "react-icons/fa";
import { SecondaryButton } from "./Button";
import Image from "next/image";

const Explore = () => {
  return (
    <section className="py-20 border-dashed">
      <div className="container">
        <div className="flex gap-10">
          <div className="w-1/2 flex flex-col justify-between items-start mb-10 ">
            <div>
              <SectionHeading title="Explore Our Products" className="mb-5" />
              <p className="text-md font-semibold text-dark">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                quod, iure ipsam sed expedita, nostrum ea amet quo voluptatum
                commodi explicabo voluptas magni accusantium natus?
              </p>
              <div className="flex items-center mt-5 me-1 sm:me-5 gap-3">
                <FaQuoteLeft className="icon" size={35} />
                <i className=" text-primary font-bold text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente, esse ipsam dolo remque.
                </i>
              </div>
              <p className="text-md font-semibold text-dark mt-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
                assumenda nihil iste vel debitis culpa dolorum quos ut
                perspiciatis in.
              </p>
              <br />
              <p className="text-md font-semibold text-dark">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
                consequuntur tenetur vel exercitationem dolorem amet maxime.
                Veritatis perferendis vel, numquam expedita officiis officia
                consequatur commodi?
              </p>
            </div>
            <SecondaryButton className="mt-5">Shop Now</SecondaryButton>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-7">
              <div className="flex flex-col gap-2 items-center justify-center bg-accent bg-opacity-20">
                <h1 className="text-2xl font-semibold">Leather Bag</h1>
                <p className="text-md font-semibold text-dark">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div>
                <Image
                  src="/assets/img/bg/right-banner-image-01.jpg"
                  alt="img"
                  width={500}
                  height={500}
                  className="h-64 object-top"
                />
              </div>
              <div>
                <Image
                  src="/assets/img/bg/right-banner-image-01.jpg"
                  alt="img"
                  width={500}
                  height={500}
                  className="h-64 object-top "
                />
              </div>
              <div className="flex flex-col gap-2 items-center justify-center bg-accent bg-opacity-20">
                <h1 className="text-2xl font-semibold">Different Types</h1>
                <p className="text-md font-semibold text-dark">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
