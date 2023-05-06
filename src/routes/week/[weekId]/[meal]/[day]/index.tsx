import { component$, useSignal } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";
import { routeAction$ } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Meals from "~/components/Meals/Meals";
import Header from "~/components/Head/Head";
import validateUser from "~/lib/auth/validateUser";
import getMeals from "~/lib/queries/getMeals";
import type { Meal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";
import selectMeal from "~/lib/queries/selectMeal";
import { useServerWeekPlan } from "~/routes/layout";

// export const useSelectMeal = routeAction$(async ({mealId}, request) => {
//   const { groupId } = await validateUser(request);
//   if (typeof mealId !== "string") {
//     return {
//       success: false,
//     }
//   }
//   // await selectMeal(mealId, groupId);
//   return {
//     success: true,
//   };
// });

export const useMeals = routeLoader$(async (request) => {
  try {
    const { groupId } = await validateUser(request);
    const meals = await getMeals(groupId);
    const { weekId, day, meal } = request.params;
    return { groupId, meals, weekId, day, meal };
  } catch (e) {
    return { groupId: "", meals: [] };
  }
});

export const onRequest = ({ params, redirect }: RequestEvent) => {
  // Verify it's 0 - 6
  // const weekIdParam = params.weekId
  // const weekId = toWeekId(getMonday(weekIdParam));
  // if (weekId !== weekIdParam) {
  //   throw redirect(302, `/week/${weekId}`);
  // }
};

export default component$(() => {
  const { meals, groupId, weekId = "", day, meal = "" } = useMeals().value;
  const weekPlan = useServerWeekPlan(); // To be able to extend (update) the week plan
  const isSaving = useSignal(false);

  return (
    <Layout>
      <Header q:slot="header">
        <span>aaa</span>
      </Header>
      <Meals
        q:slot="main"
        meals={meals}
        onSelect$={async (mealId) => {
          isSaving.value = true;
          const dayId = `d${day}`;
          const newWeekPlan: WeekPlan = {
            ...weekPlan.value,
            [dayId]: {
              [meal]: {
                id: mealId,
                name: meals.find((m) => m.id === mealId)?.name || "",
              },
            },
          };
          await selectMeal(groupId, weekId, newWeekPlan);
          isSaving.value = false;
        }}
        isSaving={isSaving.value}
      />
    </Layout>
  );
});
