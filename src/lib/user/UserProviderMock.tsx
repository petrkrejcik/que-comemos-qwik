import { component$, useVisibleTask$, useTask$, Slot, useSignal, useStore } from "@builder.io/qwik";
import UserProvider, { UserContextType } from "~/lib/user/UserProvider";
import { User, onIdTokenChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from "~/lib/firebase/auth";

export default component$(() => {
  const userContext = useStore<UserContextType>({ groupId: "", isLogged: true, loading: false, user: null });

  useTask$(async () => {
    try {
      const logged = await signInWithEmailAndPassword(auth, "test@test.com", "123456");
      const { claims } = await logged?.user.getIdTokenResult();
      if (typeof claims.groupId === "string") {
        userContext.groupId = claims.groupId;
      }
      userContext.user = {
        displayName: logged.user.displayName,
        email: logged.user.email,
        photoURL: logged.user.photoURL,
        uid: logged.user.uid,
      };
    } catch (e) {
      console.log("Cannot fake user");
    }
  });

  return (
    <UserProvider userContext={{ ...userContext }}>
      <Slot />
    </UserProvider>
  );
});
