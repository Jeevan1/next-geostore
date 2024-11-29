"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import CartItem from "./container/CartItem";
import { SecondaryButton } from "./Button";
import { clickOutside } from "../../helper";
import CartContext from "@/store/slice";

const QuickCart = () => {
  const [showCart, setShowCart] = useState(false);
  const ref = useRef(null);

  // Context values
  const { cart } = useContext(CartContext);

  // Dynamic userId (can be passed as props or fetched from auth context)
  const userId = 2;

  // Filtered cart items and subtotal calculations
  const filteredCart = cart.filter((item, index) => item.userId === userId);
  const subTotal = filteredCart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // Handle click outside to close the cart
  useEffect(() => {
    if (showCart) {
      const removeClickListener = clickOutside(ref, () => setShowCart(false));
      return () => removeClickListener();
    }
  }, [showCart]);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Cart Icon */}
      <div
        className="relative z-30 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accent"
        onClick={() => setShowCart(!showCart)}
      >
        <CiShoppingCart size={40} color="white" />
        <span className="absolute -right-0 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-white text-sm font-semibold text-accent">
          {filteredCart.length}
        </span>
      </div>

      {/* Cart Popup */}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-light bg-opacity-70">
          <div className="w-[550px] bg-white shadow-lg" ref={ref}>
            <h3 className="my-0 mb-0 bg-accent px-5 py-3 text-2xl font-semibold text-white">
              Products in Cart
            </h3>
            <ul className="max-h-[520px] min-h-40 overflow-y-scroll px-5">
              {filteredCart.length === 0 ? (
                <li className="py-4 text-center text-lg font-semibold text-primary">
                  No Items
                </li>
              ) : (
                filteredCart.map((item) => (
                  <li
                    key={item.id}
                    className="border-dashed py-4 first:border-0"
                  >
                    <CartItem item={item} />
                  </li>
                ))
              )}
            </ul>
            <div className="px-5">
              <h5 className="border-dashed pt-5 text-xl font-normal text-primary">
                Subtotal:{" "}
                <span className="font-semibold text-accent">${subTotal}</span>
              </h5>
              <SecondaryButton className="my-5 w-full">
                Checkout
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickCart;
