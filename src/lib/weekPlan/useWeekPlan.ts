import { useVisibleTask$, useStore, useSignal, useTask$ } from "@builder.io/qwik";
import { onSnapshot } from "firebase/firestore";
import { doc, DocumentReference } from "firebase/firestore";
import getFirestore from "~/lib/firebase/getFirestore";
import { WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export function useWeekPlan(groupId: string, weekId: string) {
  const weekSignal = useSignal(weekId)
  const store = useStore<{ weekPlans: Record<string, WeekPlan>; loading: boolean }>({ weekPlans: {}, loading: true });

  useTask$(({ track }) => {
    track(() => weekSignal.value);
    store.loading = true;
    console.log("🛎 ", "change");
    const unsubscribe = onSnapshot<WeekPlan>(
      doc(getFirestore(), `groups/${groupId}/weekPlans`, weekId) as DocumentReference<WeekPlan>,
      (q) => {
        // toggle loading
        store.loading = false;

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
        store.weekPlans[weekPlan.id] = weekPlan;
      },
      (error) => {
        console.log('🛎 ', 'eeeee', error);
      }
    );
    return unsubscribe;
  });

  return store;
}
