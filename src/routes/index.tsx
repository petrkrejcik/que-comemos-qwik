import { component$, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useUser } from "~/lib/user/user";
import Login from "~/components/login/Login";
import getFirebase from "~/lib/firebase/getFirebase";
import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";

export const onRequest = async () => {
  getFirebase();
};

export default component$(() => {
  const userStore = useUser();
  const weekId = "2022-05-30";

  useTask$(({track}) => {
    track(() => userStore.loading)
    if (!userStore.loading && !userStore.user) {
      console.log('🛎 ', 'not logged');
      window.location.href = '/login'
    }
  })

  return (
    <>
      <WeekPlanPage weekId={weekId} />
      {/* {loading ? <Loading /> : user ? <WeekPlan weekId={weekId} /> : <Login />} */}
    </>
  );
});

export const Loading = () => {
  return <p>Loading...</p>;
};

export const head: DocumentHead = {
  title: "Que comemos?",
  meta: [
    {
      name: "description",
      content: "Algo rico?",
    },
  ],
};
