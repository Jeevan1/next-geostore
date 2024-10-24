"use client";
import React, { useState, useEffect, useRef } from "react";
import { CiShoppingCart } from "react-icons/ci";
import CartItem from "./container/CartItem";
import { SecondaryButton } from "./Button";

import { RefObject } from "react";

export const clickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
};

const QuickCart = () => {
  const [showCart, setShowCart] = useState(false);
  const ref = useRef(null);

  const handleIconClick = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    if (showCart) {
      const removeClickListener = clickOutside(ref, () => setShowCart(false));
      return () => removeClickListener();
    }
  }, [showCart]);

  return (
    <div className="fixed bottom-10 right-10 z-20">
      <div
        className="w-16 h-16 bg-accent rounded-full flex items-center justify-center relative cursor-pointer z-30"
        onClick={handleIconClick}
      >
        <CiShoppingCart size={40} color="white" />
        <span className="absolute -top-1 -right-0 w-5 h-5 rounded-full bg-white text-accent font-semibold text-sm border-2 border-accent flex items-center justify-center">
          3
        </span>
      </div>
      <div
        className={`${
          showCart ? "block" : "hidden"
        } fixed bottom-0 right-0 top-0 left-0 bg-light bg-opacity-70 flex items-center justify-center`}
      >
        <div
          className={`w-[760px] min-h-40 max-h-[720px] bg-white shadow-lg overflow-y-scroll`}
          ref={ref}
        >
          <h3 className="my-0 mb-0 py-3 px-5 text-2xl font-semibold bg-accent text-white">
            Cart
          </h3>
          <ul className="px-5">
            <li className="py-4">
              <CartItem qty={2} />
            </li>
            <li className="border-dashed py-4">
              <CartItem qty={3} />
            </li>
            <li className="border-dashed py-4">
              <CartItem qty={1} />
            </li>
          </ul>
          <div className="px-5">
            <h5 className="text-xl text-primary font-normal border-dashed pt-5">
              Subtotal: <span className="text-accent font-semibold">$200</span>
            </h5>
            <SecondaryButton className="w-full my-5">Checkout</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCart;
