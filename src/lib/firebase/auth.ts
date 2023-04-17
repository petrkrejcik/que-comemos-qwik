import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithPopup, type Auth } from "firebase/auth";
import firebase from "~/lib/firebase/getFirebase";

const disableFirebaseEmulators = !!import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS as boolean;
let emulatorsInitialised = false;

const initialiseEmulators = (auth: Auth) => {
  if (import.meta.env.DEV) {
    if (!emulatorsInitialised) {
      console.info("Initialising Firebase Auth emulator");

      connectAuthEmulator(auth, "http://127.0.0.1:9099");
      emulatorsInitialised = true;
    }
  }
};

const auth = getAuth(firebase);
if (!disableFirebaseEmulators) {
  initialiseEmulators(auth);
}

export const login = async () => {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    if (!userCredential) {
      throw new Error("Login failed");
    }
    
    // window.location.href = "/";
  } catch (e) {
    console.error(e);
  }
};

export default auth;
