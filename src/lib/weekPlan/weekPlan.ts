import { useBrowserVisibleTask$, useStore } from "@builder.io/qwik";
import { onSnapshot } from "firebase/firestore";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  DocumentReference,
  DocumentData
} from "firebase/firestore";
import getFirestore from "~/lib/firebase/getFirestore";

interface Day {
  lunch: {
    id: string;
    name: string;
    icon?: string;
  };
}

export interface WeekPlan {
  d0?: Day;
  d1?: Day;
  d2?: Day;
  d3?: Day;
  d4?: Day;
  d5?: Day;
  d6?: Day;
  id: string;
}

export function useWeekPlan(groupId: string, weekId: string) {
  const _store = useStore<{ weekPlans: Record<string, WeekPlan>; loading: boolean }>({ weekPlans: {}, loading: true });
  
  useBrowserVisibleTask$(() => {
    _store.loading = true;
    const unsubscribe = onSnapshot<WeekPlan>(
      doc(getFirestore(), `groups/${groupId}/weekPlans`, weekId) as DocumentReference<WeekPlan>,
      (q) => {
        // toggle loading
        _store.loading = false;

        // if no data
        if (!q.exists) {
          return;
        }

        const weekPlan = { ...q.data(), id: q.id };
        // get data, map to todo type

        /**
         * Note: Will get triggered 2x on add
         * 1 - for optimistic update
         * 2 - update real date from server date
         */

        // add to store
        _store.weekPlans[weekPlan.id] = weekPlan;
      }
    );
    return unsubscribe;
  });

  return _store;
}
