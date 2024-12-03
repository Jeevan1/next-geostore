import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import firebase_app from "../config";
import { enqueueSnackbar } from "notistack";

const db = getFirestore(firebase_app);

export const addToCart = async (data: any, userId: string) => {
  if (!data || !userId) {
    // console.error("Invalid data or userId:", { data, userId });
    enqueueSnackbar("Failed to add product to cart", { variant: "error" });
    return;
  }
  try {
    // Convert any Date to Firestore Timestamp
    if (data.createdAt instanceof Date) {
      data.createdAt = Timestamp.fromDate(data.createdAt);
    }

    const docRef = doc(db, "cart", userId, "items", `${data.productId}`);

    // Check if the cart item already exists
    const existingCartItem = await getDoc(docRef);
    if (existingCartItem.exists()) {
      enqueueSnackbar("Product already in cart", { variant: "error" });
      return;
    }

    // Add new product to cart
    await setDoc(
      docRef,
      {
        ...data,
        createdAt: Timestamp.fromDate(new Date()),
      },
      { merge: true },
    );

    enqueueSnackbar("Product added to cart successfully", {
      variant: "success",
    });
  } catch (err) {
    // console.error("Error adding to cart:", err);
    enqueueSnackbar("Failed to add product to cart", { variant: "error" });
  }
};
