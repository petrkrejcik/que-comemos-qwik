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
import getWeekPlan from "~/lib/queries/getWeekPlan";
import { HiPlusOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const { groupId } = useUser();
  const { weekId, day, meal } = useLocation().params;
  // const meal = useDaytime() // todo: use better this
  const resources = useResource$(async ({ track }) => {
    track(() => meal);
    const eatFor = meal === "lunch-side-dish" ? "side-dish" : meal;
    const meals = await getMeals(groupId, eatFor);
    const weekPlan = await getWeekPlan(weekId, groupId);
    return { meals, weekPlan };
  });

  // const { meals, groupId, weekId = "", day, meal = "" } = useMeals().value;
  // const weekPlan = useServerWeekPlan(); // To be able to extend (update) the week plan
  // const weekPlan = { value: {} };
  const isSaving = useSignal(false);

  return (
    <Layout>
      <Header q:slot="header">
        <span
          onClick$={() => history.back()}
          class="btn btn-ghost btn-sm rounded-btn text-2xl"
          q:slot="start"
          aria-role="button"
          aria-label="Back"
        >
          <HiArrowLeftOutline />
        </span>
      </Header>
      <div class={"w-full flex collapse-title"} q:slot="main">
        <div class="avatar placeholder mr-4">
          <div class={`rounded-full w-12 h-12`}>
            <HiPlusOutline />
          </div>
        </div>
        <Link href="/add" class="btn btn-ghost">
          Añadir comida nueva
        </Link>
      </div>
      <div q:slot="main">
        <Resource
          value={resources}
          onPending={() => <>loading</>}
          onRejected={() => <p>Rejected</p>}
          onResolved={({ meals, weekPlan }) => {
            return (
              <Meals
                q:slot="main"
                meals={meals}
                isSaving={isSaving.value}
                onSelect$={async (mealId) => {
                  isSaving.value = true;
                  const dayId = `d${day}` as
                    | "d0"
                    | "d1"
                    | "d2"
                    | "d3"
                    | "d4"
                    | "d5"
                    | "d6";
                  const newWeekPlan: WeekPlan = {
                    ...weekPlan,
                    [dayId]: {
                      ...(weekPlan[dayId] || {}),
                      [meal]: {
                        id: mealId,
                        name: meals.find((m) => m.id === mealId)?.name || "",
                      },
                    },
                  };
                  delete newWeekPlan[dayId]?.[`${meal as "lunch"}-side-dish`]; // `meal` should be properly typed
                  try {
                    await selectMeal(groupId, weekId, newWeekPlan);
                    isSaving.value = false;
                    window.history.back();
                  } catch (error) {
                    console.error(error);
                    isSaving.value = false;
                  }
                }}
              />
            );
          }}
        />
      </div>
    </Layout>
  );
});
