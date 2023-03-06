import { getApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';

const disableFirebaseEmulators = !!import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS as boolean;

export default () => {
	const auth = getAuth(getApp());
	if (!disableFirebaseEmulators) {
		initialiseEmulators(auth);
	}

	return auth;
};

let emulatorsInitialised = false;

const initialiseEmulators = (auth: Auth) => {
	if (import.meta.env.DEV) {
		if (!emulatorsInitialised) {
			console.info('Initialising Firebase Auth emulator');

			connectAuthEmulator(auth, 'http://127.0.0.1:9099');
			emulatorsInitialised = true;
		}
	}
};
