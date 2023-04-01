import firebaseAdmin from 'firebase-admin';

export const getFirebaseAdmin = () => {
	try {
		return firebaseAdmin.app('admin');
	} catch (e) {
		const serviceAccount = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY as string);

		// Init emulators for firebase-admin
		// https://github.com/firebase/firebase-admin-node/issues/776#issuecomment-751685424
		const disableFirebaseEmulators = !!import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS as boolean
		if (!disableFirebaseEmulators) {
			console.log('🛎 ', 'emul');
			process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
			process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
		}

		console.log('🛎 ', 'init FB');
		return firebaseAdmin.initializeApp(
			{
				credential: firebaseAdmin.credential.cert({
					projectId: serviceAccount.project_id,
					clientEmail: serviceAccount.client_email,
					privateKey: serviceAccount.private_key
				}),
				databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com'
			},
			'admin'
		);
	}
};

const admin = getFirebaseAdmin();
// import firebaseAdmin from "firebase-admin";


// const serviceAccount = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY as string);

// admin = firebaseAdmin.initializeApp(
//   {
//     credential: firebaseAdmin.credential.cert({
//       projectId: serviceAccount.project_id,
//       clientEmail: serviceAccount.client_email,
//       privateKey: serviceAccount.private_key,
//     }),
//     databaseURL: "https://que-comemos-hoy-5febf.firebaseio.com",
//   },
//   "admin"
// );

export default admin;

