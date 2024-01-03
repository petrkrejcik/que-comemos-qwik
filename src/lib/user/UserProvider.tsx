import { component$, useVisibleTask$, useTask$, Slot } from "@builder.io/qwik";
import { useContextProvider, createContextId, useStore } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { User, onIdTokenChanged } from "firebase/auth";
import getAuth from "~/lib/firebase/auth";
import refreshCustomToken from "~/lib/user/refreshCustomToken";
import validateUser from "~/server/validateUser";

export interface UserData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
}

export type UserContextType = { groupId: string; isLogged: boolean; loading: boolean; user: UserData | null };
const defaultUserContext: UserContextType = { groupId: "", isLogged: false, loading: false, user: null };

export const UserContext = createContextId<UserContextType>("user-context");

export default component$(({ userContext }: { userContext?: UserContextType }) => {
  const store = useStore<UserContextType>(userContext || defaultUserContext);

  useTask$(async () => {
    if (isServer) {
      try {
        const { groupId } = await validateUser();
        store.isLogged = true;
        store.groupId = groupId;
        store.loading = false;
      } catch (e) {
        console.log('🛎 ', 'UserProvider:useTask - not valid user');
        store.isLogged = false;
        store.loading = true;
      }
    }
  });

  useVisibleTask$(() => {
    // toggle loading
    store.loading = !store.isLogged;

    // subscribe to user changes
    const unsubscribe = onIdTokenChanged(getAuth(), async (user: User | null) => {
      store.loading = false;
      if (!user) {
        store.isLogged = false;
        store.user = null;
        return;
      }
      
      const { claims } = await user.getIdTokenResult();

      const { groupId } = claims;
      if (!groupId) {
        throw new Error("No groupId");
      }

      const { photoURL, uid, displayName, email } = user;
      const data = { photoURL, uid, displayName, email };

      refreshCustomToken(user);

      // set store
      store.user = data;
      store.isLogged = true;
    });
    
    return unsubscribe;
  });

  useContextProvider(UserContext, store);

  return <Slot />;
});
