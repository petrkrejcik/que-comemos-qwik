import { getApp } from 'firebase/app';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import firebase from '~/lib/firebase/getFirebase';

const disableFirebaseEmulators = !!import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS as boolean
let emulatorsInitialised = false;

export default () => {
	const firestore = getFirestore(firebase);

	if (!disableFirebaseEmulators) {
		initialiseEmulators(firestore);
	}

	return firestore;
};


const initialiseEmulators = (firestore: Firestore) => {
	if (import.meta.env.DEV) {
		if (!emulatorsInitialised) {
			console.info('Initialising Firestore emulator');

			connectFirestoreEmulator(firestore, 'localhost', 8080);
			emulatorsInitialised = true;
		}
	}
};
