import { useBrowserVisibleTask$, useStore } from '@builder.io/qwik';
import { onIdTokenChanged, User } from 'firebase/auth';
import getAuth from '~/lib/firebase/getAuth';
import getFirebase from '~/lib/firebase/getFirebase';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export function useUser() {
    const _store = useStore<{ loading: boolean, user: userData | null }>({ loading: true, user: null });
    
    useBrowserVisibleTask$(() => {
        getFirebase() // TODO: remove
        // toggle loading
        _store.loading = true;

        // subscribe to user changes
        const unsubscribe = onIdTokenChanged(getAuth(), (_user: User | null) => {
            _store.loading = false;
            if (!_user) {
                _store.user = null;
                return;
            }

            // map data to user data type
            const { photoURL, uid, displayName, email } = _user;
            const data = { photoURL, uid, displayName, email };

            // set store
            _store.user = data;
        });
        return unsubscribe;
    });

    return _store;
};
