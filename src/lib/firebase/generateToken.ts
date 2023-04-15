import { getTokenFromGCPServiceAccount } from "@sagi.io/workers-jwt";
import getConfig from "~/lib/firebase/getConfig";
// import { FlarebaseAuth } from 'flarebase-auth';



// const auth = new FlarebaseAuth({
//   apiKey: 'AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU',
//   projectId: serviceAccountJSON.project_id,
//   privateKey: serviceAccountJSON.private_key,
//   serviceAccountEmail: serviceAccountJSON.client_email,
// });

export default async () => {
  // const { token, user } = await auth.signInWithEmailAndPassword(
  //   'my@email.com',
  //   'supersecurepassword'
  // );

  const {serviceAccountJSON} = getConfig();
  const aud = `https://firestore.googleapis.com/google.firestore.v1.Firestore`;

  const token = await getTokenFromGCPServiceAccount({ serviceAccountJSON, aud });

  return token;
};
