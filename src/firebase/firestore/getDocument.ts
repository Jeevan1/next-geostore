import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const getCartItems = async (userId: string) => {
  try {
    if (!userId) {
      console.error("Invalid userId");
      return null;
    }

    // Reference to the user's items subcollection
    const itemsRef = collection(db, "cart", userId, "items");

    // Fetch all documents in the items subcollection
    const querySnapshot = await getDocs(itemsRef);

    // Map the query results to an array
    const cartItems = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID (e.g., productId)
      ...doc.data(), // Document data
    }));

    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return null;
  }
};

export const subscribeToCartItems = (
  userId: string,
  callback: (items: any[]) => void,
) => {
  if (!userId) {
    console.error("Invalid userId");
    return null;
  }

  const itemsRef = collection(db, "cart", userId, "items");
  //   const q = query(itemsRef, orderBy("createdAt"));
  if (!itemsRef) {
    console.error("Invalid itemsRef");
    return null;
  }
  // Set up a real-time listener
  const unsubscribe = onSnapshot(
    itemsRef,
    (snapshot) => {
      const cartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(cartItems);
    },
    (error) => {
      console.error("Error listening to cart updates:", error);
    },
  );

  return unsubscribe; // Return the unsubscribe function to stop listening
};

export const getOrders = async (userId: string) => {
  try {
    if (!userId) {
      console.error("Invalid userId");
      return null;
    }

    // Reference to the user's items subcollection
    const itemsRef = collection(db, "orders", userId, "items");

    // Fetch all documents in the items subcollection
    const querySnapshot = await getDocs(itemsRef);

    // Map the query results to an array
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID (e.g., productId)
      ...doc.data(), // Document data
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};
