import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const addToCart = async (data: any, userId: string) => {
  if (!data || !userId) {
    console.error("Invalid data or userId:", { data, userId });
    alert("Invalid data or userId");
    return;
  }
  try {
    // Validate data fields
    // if (!data.productId || typeof data.productId !== "string") {
    //   throw new Error("Invalid productId in data");
    // }

    // Convert any Date to Firestore Timestamp
    if (data.createdAt instanceof Date) {
      data.createdAt = Timestamp.fromDate(data.createdAt);
    }

    const docRef = doc(db, "cart", userId, "items", `${data.productId}`);

    // Check if the cart item already exists
    const existingCartItem = await getDoc(docRef);
    if (existingCartItem.exists()) {
      alert("Product already in cart");
      return;
    }

    // Add new product to cart
    await setDoc(docRef, data, { merge: true });
    alert("Product added to cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Failed to add product to cart. Please try again.");
  }
};
