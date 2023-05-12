import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Meals from "~/components/Meals/Meals";
import Header from "~/components/Head/Head";
import validateUser from "~/lib/auth/validateUser";
import getMeals from "~/lib/queries/getMeals";
import type { WeekPlan } from "~/lib/weekPlan/weekPlanTypes";
import selectMeal from "~/lib/queries/selectMeal";
import { useServerWeekPlan } from "~/routes/layout";

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

export default component$(() => {
  const { meals, groupId, weekId = "", day, meal = "" } = useMeals().value;
  const weekPlan = useServerWeekPlan(); // To be able to extend (update) the week plan
  const isSaving = useSignal(false);

  return (
    <Layout>
      <Header q:slot="header">
        <span onClick$={() => history.back()} class="btn btn-ghost btn-sm rounded-btn" q:slot="start">
          Back
        </span>
      </Header>
      <div class={"w-full flex p-2 justify-center"} q:slot="main">
        <Link href="/add" class="btn btn-ghost">
          Añadir comida nueva
        </Link>
      </div>
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
          window.history.back();
        }}
        isSaving={isSaving.value}
      />
    </Layout>
  );
});
