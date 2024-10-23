import React from "react";
import SectionHeading from "./SectionHeading";
import FormInput from "./form/FormInput";
import { SecondaryButton } from "./Button";

const NewsLetter = () => {
  return (
    <section className="py-20 border-dashed">
      <div className="container">
        <div className="flex justify-center gap-10">
          <div className="w-1/2">
            <SectionHeading
              title="By Subscribing To Our Newsletter You Can Get 20% Off"
              description="lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quod, iure ipsam sed expedita, nostrum ea amet quo voluptatum commodi explicabo voluptas magni accusantium natus?"
              className="gap-5"
            />
            <form action="" className="flex gap-4">
              <FormInput />
              <FormInput />
              <SecondaryButton className="w-1/3">Subscribe</SecondaryButton>
            </form>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h6 className="font-bold text-lg mb-2">Store Location</h6>
                <p className="text-md font-semibold text-accent">
                  Kathmandu, Nepal
                </p>
              </div>
              <div>
                <h6 className="font-bold text-lg mb-2">Work Hours</h6>
                <p className="text-md font-semibold text-accent">
                  9:00 AM - 7:00 PM Daily
                </p>
              </div>
              <div>
                <h6 className="font-bold text-lg mb-2">Phone Number</h6>
                <p className="text-md font-semibold text-accent">
                  +977-98267-2727
                </p>
              </div>
              <div>
                <h6 className="font-bold text-lg mb-2">Email Address</h6>
                <p className="text-md font-semibold text-accent">
                  geoshop@gmail
                </p>
              </div>
              <div>
                <h6 className="font-bold text-lg mb-2">Social Media</h6>
                <p className="text-md font-semibold text-accent">
                  Facebook, Twitter, Instagram and More
                </p>
              </div>
              <div>
                <h6 className="font-bold text-lg mb-2">Office Location</h6>
                <p className="text-md font-semibold text-accent">
                  Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
