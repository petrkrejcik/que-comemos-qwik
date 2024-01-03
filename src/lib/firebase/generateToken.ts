// @ts-ignore
import { getTokenFromGCPServiceAccount } from "@sagi.io/workers-jwt";
import getAuth from "./auth";
import getConfig from "./getConfig";
// import { FlarebaseAuth } from 'flarebase-auth';

// const auth = new FlarebaseAuth({
//   apiKey: 'AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU',
//   projectId: serviceAccountJSON.project_id,
//   privateKey: serviceAccountJSON.private_key,
//   serviceAccountEmail: serviceAccountJSON.client_email,
// });
const generateEmulatorToken = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU",
      // "http://192.168.1.130:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "123456",
          returnSecureToken: true,
        }),
      }
    );
    const data = await response.json();
    return data.idToken;
  } catch (e) {
    console.log('🛎 ', 'Failed to generate emulator token');
    throw e
  }
};

export default async () => {
  // const { token, user } = await auth.signInWithEmailAndPassword(
  //   'my@email.com',
  //   'supersecurepassword'
  // );
  if (!!getAuth().emulatorConfig) {
    return generateEmulatorToken();
  }

  const { serviceAccountJSON } = getConfig();
  const aud = `https://firestore.googleapis.com/google.firestore.v1.Firestore`;

  try {
    const token = await getTokenFromGCPServiceAccount({ serviceAccountJSON, aud });
    return token;
    
  } catch (error) {
    console.log('🛎 ', 'error in sagi', error, {SA: !!serviceAccountJSON});
  }

};
