import { useVisibleTask$, useStore } from '@builder.io/qwik';
import { onIdTokenChanged, User } from 'firebase/auth';
import auth from '~/lib/firebase/auth';
import refreshCustomToken from '~/lib/user/refreshCustomToken';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export function useUser() {
    const store = useStore<{ loading: boolean, user: userData | null }>({ loading: true, user: null });
    
    useVisibleTask$(() => {
        // toggle loading
        store.loading = true;

        // subscribe to user changes
        const unsubscribe = onIdTokenChanged(auth, (user: User | null) => {
            store.loading = false;
            if (!user) {
                store.user = null;
                return;
            }
            
            // map data to user data type
            const { photoURL, uid, displayName, email } = user;
            const data = { photoURL, uid, displayName, email };
            
            refreshCustomToken(user)

            // set store
            store.user = data;
        });
        return unsubscribe;
    });

    return store;
};
