"use client";
import "./globals.css";
import CartContext, { ProductContext } from "@/store/slice";
import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../helper";
import { AuthContextProvider } from "@/context/AuthContext";
import { fetchData } from "@/utils/api-service";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const savedCart = getLocalStorageItem("cart");

  useEffect(() => {
    if (savedCart) setCart(JSON.parse(savedCart));
    else {
      // If no cart exists, create one
      setLocalStorageItem("cart", JSON.stringify(cart));
    }
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      const {
        data: products,
        loading: productsLoading,
        error: productsError,
      } = await fetchData("?limit=0", {});

      if (productsError) {
        console.error("Error fetching products:", productsError);
      }

      if (productsLoading) {
        console.log("Loading products...");
      }

      setProducts(products);
    };

    getAllProducts();
  }, []);

  return (
    <html lang="en">
      <body>
        <ProductContext.Provider value={{ products, setProducts }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <AuthContextProvider>{children}</AuthContextProvider>
          </CartContext.Provider>
        </ProductContext.Provider>
      </body>
    </html>
  );
}
