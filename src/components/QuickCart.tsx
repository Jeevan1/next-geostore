"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CiCircleRemove, CiShoppingCart } from "react-icons/ci";
import CartItem from "./container/CartItem";
import { SecondaryButton } from "./Button";
import { clickOutside } from "../../helper";
import CartContext from "@/store/slice";
import { subscribeToCartItems } from "@/firebase/firestore/getDocument";
import { useAuthContext } from "@/context/AuthContext";
import { removeCartItem } from "@/firebase/firestore/removeCart";
import Link from "next/link";

const QuickCart = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const ref = useRef(null);

  // Context values
  // const { cart } = useContext(CartContext);

  const { user } = useAuthContext();

  // Dynamic userId (can be passed as props or fetched from auth context)
  const userId = 2;

  // Filtered cart items and subtotal calculations
  const filteredCart = cartItems.filter(
    (item, index) => item.userId === userId,
  );

  const handleRemoveItem = async (itemId: string) => {
    const success = await removeCartItem(`${user?.uid}`, `${itemId}`);
    if (success) {
      // Update the local state to reflect the removal
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId),
      );
    }
  };

  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // Handle click outside to close the cart
  useEffect(() => {
    if (showCart) {
      const removeClickListener = clickOutside(ref, () => setShowCart(false));
      return () => removeClickListener();
    }
  }, [showCart]);

  useEffect(() => {
    const unsubscribe = subscribeToCartItems(`${user?.uid}`, (items) => {
      setCartItems(items);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe && unsubscribe();
  }, [userId]);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Cart Icon */}
      <div
        className="relative z-30 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accent"
        onClick={() => setShowCart(!showCart)}
      >
        <CiShoppingCart size={40} color="white" />
        <span className="absolute -right-0 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-white text-sm font-semibold text-accent">
          {cartItems.length}
        </span>
      </div>

      {/* Cart Popup */}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-light bg-opacity-70">
          <div className="w-[550px] bg-white shadow-lg" ref={ref}>
            <div className="relative flex items-center justify-between">
              <h3 className="my-0 mb-0 flex-1 bg-accent px-5 py-3 text-2xl font-semibold text-white">
                Products in Cart
              </h3>
              <CiCircleRemove
                size={30}
                color="white"
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowCart(false)}
              />
            </div>
            <ul className="max-h-[520px] min-h-40 overflow-y-scroll px-5">
              {cartItems.length === 0 ? (
                <li className="py-4 text-center text-lg font-semibold text-primary">
                  No Items
                </li>
              ) : (
                cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="border-dashed py-4 first:border-0"
                  >
                    <CartItem item={item} onRemove={handleRemoveItem} />
                  </li>
                ))
              )}
            </ul>
            <div className="px-5">
              <h5 className="border-dashed pt-5 text-xl font-normal text-primary">
                Subtotal:{" "}
                <span className="font-semibold text-accent">${subTotal}</span>
              </h5>
              <Link href="/checkout" onClick={() => setShowCart(false)}>
                <SecondaryButton className="my-5 w-full">
                  Checkout
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickCart;
