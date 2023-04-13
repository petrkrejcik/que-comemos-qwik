import { component$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";
// import validateUser from "~/lib/user/validateUser";
// import getWeekPlan from "~/lib/weekPlan/getWeekPlan.server";

// export const useServerWeekPlan = routeLoader$(async (request) => {
//   try {
//     // const user = await validateUser(request)
//     const user = { groupId: "default"}
//     return getWeekPlan(request.params.weekId, user.groupId)
//   } catch (e) {
//     console.log("🛎 ", "errrrrr", e);
//     return {};
//   }
// });

export default component$(() => {
  const { weekId } = useLocation().params;
  // const weekPlan = useServerWeekPlan().value;
  // console.log('🛎 ', 'weekPlan', weekPlan);

  return <WeekPlanPage weekId={weekId} />;
});

export const head: DocumentHead = {
  title: "Week",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
