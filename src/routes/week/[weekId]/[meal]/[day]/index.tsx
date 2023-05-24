import {
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Meals from "~/components/Meals/Meals";
import Header from "~/components/Head/Head";
import getMeals from "~/lib/queries/getMeals";
import type { WeekPlan } from "~/lib/weekPlan/weekPlanTypes";
import selectMeal from "~/lib/queries/selectMeal";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import { useUser } from "~/lib/user/user";

export default component$(() => {
  const { groupId } = useUser();
  const { weekId, day, meal } = useLocation().params;
  const mealsResource = useResource$(async () => {
    const result = await getMeals(groupId);
    return result;
  });

  // const { meals, groupId, weekId = "", day, meal = "" } = useMeals().value;
  // const weekPlan = useServerWeekPlan(); // To be able to extend (update) the week plan
  const weekPlan = { value: {} };
  const isSaving = useSignal(false);

  return (
    <Layout>
      <Header q:slot="header">
        <span
          onClick$={() => history.back()}
          class="btn btn-ghost btn-sm rounded-btn text-2xl"
          q:slot="start"
        >
          <HiArrowLeftOutline />
        </span>
      </Header>
      <div class={"w-full flex p-2 justify-center"} q:slot="main">
        <Link href="/add" class="btn btn-ghost">
          Añadir comida nueva
        </Link>
      </div>
      <div q:slot="main">
        <Resource
          value={mealsResource}
          onPending={() => <>loading</>}
          onRejected={() => <p>Rejected</p>}
          onResolved={(meals) => {
            return (
              <Meals
                q:slot="main"
                meals={meals}
                onSelect$={async (mealId) => {
                  isSaving.value = true;
                  const dayId = `d${day}`;
                  const newWeekPlan: WeekPlan = {
                    [dayId]: {
                      [meal]: {
                        id: mealId,
                        name: meals.find((m) => m.id === mealId)?.name || "",
                      },
                    },
                  };
                  try {
                    await selectMeal(groupId, weekId, newWeekPlan);
                    isSaving.value = false;
                    window.history.back();
                  } catch (error) {
                    console.error(error);
                    isSaving.value = false;
                  }
                }}
                isSaving={isSaving.value}
              />
            );
          }}
        />
      </div>
    </Layout>
  );
});
