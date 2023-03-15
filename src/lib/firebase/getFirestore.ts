import { getApp } from 'firebase/app';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';

const disableFirebaseEmulators = true
// const disableFirebaseEmulators = !!import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS as boolean

export default () => {
	const firestore = getFirestore(getApp());

	if (!disableFirebaseEmulators) {
		initialiseEmulators(firestore);
	}

	return firestore;
};

let emulatorsInitialised = false;

const initialiseEmulators = (firestore: Firestore) => {
	if (import.meta.env.DEV) {
		if (!emulatorsInitialised) {
			console.info('Initialising Firestore emulator');

			connectFirestoreEmulator(firestore, 'localhost', 8080);
			emulatorsInitialised = true;
		}
	}
};
