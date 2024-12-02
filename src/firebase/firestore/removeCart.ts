import {
  doc,
  deleteDoc,
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const removeCartItem = async (userId: string, itemId: string) => {
  try {
    if (!userId || !itemId) {
      console.error("Invalid userId or itemId");
      return;
    }

    // Reference to the specific cart item document
    const itemRef = doc(db, "cart", userId, "items", itemId);

    // Delete the document
    await deleteDoc(itemRef);
    console.log("Cart item removed successfully");
    return true; // Optionally, return a success response
  } catch (error) {
    console.error("Error removing cart item:", error);
    return false; // Optionally, return a failure response
  }
};

export const removeCart = async (userId: string) => {
  try {
    if (!userId) {
      console.error("Invalid userId");
      return false;
    }

    // Reference to the user's cart document
    const cartRef = doc(db, "cart", userId);
    const itemsRef = collection(db, "cart", userId, "items");

    // Get all items in the subcollection and delete them
    const itemsSnapshot = await getDocs(itemsRef);
    const deletePromises = itemsSnapshot.docs.map((itemDoc) =>
      deleteDoc(itemDoc.ref),
    );
    await Promise.all(deletePromises);

    // After deleting subcollection, delete the cart document
    await deleteDoc(cartRef);

    console.log("Cart and all items removed successfully");
    return true;
  } catch (error) {
    console.error("Error removing cart:", error.message);
    return false;
  }
};
