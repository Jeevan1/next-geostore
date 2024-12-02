import Image from "next/image";
import React, { useState } from "react";
import FormInput from "../form/FormInput";
import { CiSquareRemove } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { removeFromCart } from "../../../helper";

const CartItem = ({ item, onRemove }: { item: any; onRemove: any }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  return (
    <div className="relative flex justify-between gap-5">
      <Image
        src={item?.image}
        alt={item?.name}
        width={100}
        height={170}
        className="h-24 w-24 bg-slate-300 object-cover object-top"
      />
      <div className="flex flex-1 flex-col">
        <h3 className="me-10 text-md font-semibold">{item?.name}</h3>
        <div>
          <p className="text-accentx text-xs font-semibold">{item?.category}</p>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <GoDotFill size={15} className="text-primary" />
              <span className="text-accentx text-sm font-semibold">
                Size: {item?.size}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <span>
                <GoDotFill size={15} className="text-primary" />
              </span>
              <span className="text-accentx text-sm font-semibold">
                Color: {item?.color}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button className="h-7 w-7 bg-primary text-xl text-white">-</button>
            <FormInput
              name=""
              placeholder="1"
              type="number"
              value={quantity}
              className="min-h-7 w-[50px] px-2"
            />
            <button className="h-7 w-7 bg-primary text-xl text-white">+</button>
          </div>
          <b className="block text-end">${item?.price * quantity}</b>
        </div>
      </div>
      <CiSquareRemove
        size={30}
        className="cursor-pointer"
        onClick={() => onRemove(item?.productId)}
      />
    </div>
  );
};

export default CartItem;
