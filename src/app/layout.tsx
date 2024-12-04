"use client";
import "./globals.css";
import CartContext, { ProductContext } from "@/store/slice";
import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../helper";
import { AuthContextProvider } from "@/context/AuthContext";
import { fetchData } from "@/utils/api-service";
import { SnackbarProvider } from "notistack";
import { CartItem, Product } from "@/utils/types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  let windowWidth = 0;

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

  useEffect(() => {
    windowWidth = window.innerWidth;
  }, []);

  return (
    <html lang="en">
      <body>
        <SnackbarProvider
          autoHideDuration={2000}
          maxSnack={3}
          className="w-fit"
          anchorOrigin={
            windowWidth > 768
              ? { vertical: "bottom", horizontal: "left" }
              : { vertical: "top", horizontal: "right" }
          }
        />
        <ProductContext.Provider value={products}>
          <CartContext.Provider value={cart}>
            <AuthContextProvider>{children}</AuthContextProvider>
          </CartContext.Provider>
        </ProductContext.Provider>
      </body>
    </html>
  );
}
