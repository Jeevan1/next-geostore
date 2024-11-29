import { RefObject } from "react";

export const clickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
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

// Fallback for localStorage
const fallbackStorage = {};

export const getLocalStorageItem = (key) => {
  try {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    } else {
      return fallbackStorage[key] || null;
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

export const setLocalStorageItem = (key, value) => {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    } else {
      fallbackStorage[key] = value;
    }
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

export const addToCart = (product) => {
  try {
    // Retrieve existing cart from localStorage or initialize an empty array
    const cart = JSON.parse(getLocalStorageItem("cart")) || [];

    // Check if the product already exists in the cart for the same user and product ID
    const existingProduct = cart.find(
      (item) =>
        product.userId === item.userId && product.productId === item.productId,
    );

    if (existingProduct) {
      alert(
        `Product already in cart for user ${existingProduct.userId} & id ${product.productId}.`,
      );
    } else {
      // Add new product to the cart and update localStorage
      const updatedCart = [...cart, product];
      setLocalStorageItem("cart", JSON.stringify(updatedCart));
      alert("Product added to cart successfully!");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    alert("An error occurred while adding the product to the cart.");
  }
};

export const removeFromCart = (product) => {
  try {
    // Retrieve existing cart from localStorage or initialize an empty array
    const cart = JSON.parse(getLocalStorageItem("cart")) || [];

    // Filter out the product to be removed
    const updatedCart = cart.filter(
      (item) =>
        item.userId !== product.userId || item.productId !== product.productId,
    );

    // Update localStorage with the updated cart
    setLocalStorageItem("cart", JSON.stringify(updatedCart));
    alert("Product removed from cart successfully!");
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    alert("An error occurred while removing the product from the cart.");
  }
};
