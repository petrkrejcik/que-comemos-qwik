import { User } from "firebase/auth";

export default async (user: User)=>{
  const idToken = await user.getIdToken()
  const response = await fetch(`http://localhost:3001/api/session?token=${idToken}`);
  const result = await response.json();
  console.log('🛎 ', 'result', result);
}