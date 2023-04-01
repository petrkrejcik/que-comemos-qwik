import {  GoogleAuthProvider, connectAuthEmulator, signInWithPopup } from "firebase/auth";
import {Auth, getAuth} from 'firebase-admin/auth'
import admin from "~/lib/firebase/getFirebaseAdmin.server";

const disableFirebaseEmulators = !!import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS as boolean;
let emulatorsInitialised = false;

const initialiseEmulators = (auth: any) => {
  if (import.meta.env.DEV) {
    if (!emulatorsInitialised) {
      console.info("Initialising Firebase Auth emulator");

      connectAuthEmulator(auth, "http://127.0.0.1:9099");
      emulatorsInitialised = true;
    }
  }
};

const auth = getAuth(admin);

// if (!disableFirebaseEmulators) {
//   initialiseEmulators(auth);
// }


export default auth;
