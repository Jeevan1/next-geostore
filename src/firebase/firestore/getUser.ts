import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const getUser = async (uid: string) => {
  try {
    if (!uid) {
      throw new Error("Invalid UID");
    }

    // Reference to the user's document
    const userRef = doc(db, "users", uid);

    // Fetch the document
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      // Return the user data
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } else {
      console.error("No user found with the specified UID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
