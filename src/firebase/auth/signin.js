import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

const auth = getAuth(firebase_app);

const firebaseErrorMessages = {
  "auth/invalid-email": "Invalid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid credential. Please try again.",
  // Add more error codes and messages as needed
};

export default async function signIn(email, password) {
  let result = null,
    error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
    const errorMessage =
      firebaseErrorMessages[e.code] || "An unexpected error occurred.";
    enqueueSnackbar(errorMessage, { variant: "error" });
  }

  return { result, error };
}
