import Image from "next/image";
import React, { useState } from "react";
import FormInput from "../form/FormInput";
import { CiSquareRemove } from "react-icons/ci";

const CartItem = ({ qty = 1 }: { qty: number }) => {
  const [quantity, setQuantity] = useState(qty);
  return (
    <div className="flex justify-between gap-5 relative">
      <Image
        src="/assets/img/bg/right-banner-image-01.jpg"
        alt="img"
        width={500}
        height={500}
        className="h-24 w-24 object-cover object-top bg-slate-300"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold me-10">
          Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
        </h3>
        <p className="text-sm font-semibold text-accentx mb-4">
          Men's Slim Fit
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-primary text-white text-xl">
              -
            </button>
            <FormInput
              name=""
              placeholder="1"
              type="text"
              value="1"
              className="w-10"
            />
            <button className="w-10 h-10 bg-primary text-white text-xl">
              +
            </button>
          </div>
          <b>$120.00</b>
        </div>
      </div>
      <CiSquareRemove
        size={30}
        className="cursor-pointer"
        onClick={() => setQuantity(0)}
      />
    </div>
  );
};

export default CartItem;
