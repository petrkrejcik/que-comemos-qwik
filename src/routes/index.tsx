import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";
import { toWeekId, getWeek } from "~/lib/date/date";
// import validateUser from "~/lib/user/validateUser";
// import getWeekPlan from "~/lib/weekPlan/getWeekPlan.server";

// export const useServerWeekPlan = routeLoader$(async (request) => {
//   try {
//     // const user = await validateUser(request)
//     const user = { groupId: "default"}
//     const weekId = toWeekId(getWeek());
//     return getWeekPlan(weekId, user.groupId)
//   } catch (e) {
//     console.log("🛎 ", "errrrrr", e);
//     return {};
//   }
// });

export default component$(() => {
  const weekId = toWeekId(getWeek());
  // const weekPlan = useServerWeekPlan().value;
  // console.log("🛎 ", "weekPlan", weekPlan);

  // useVisibleTask$(async () => {
  //   await fetch("/api/session", {
  //     body: JSON.stringify({ idToken: "aaa" }),
  //     method: "POST",
  //     headers: {
  //       'content-type': "application/json",
  //     },
  //   });
  // });

  return <WeekPlanPage weekId={weekId} />;
});

export const head: DocumentHead = {
  title: "Que comemos?",
  meta: [
    {
      name: "description",
      content: "Algo rico?",
    },
  ],
};
