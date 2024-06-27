import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Meals from "~/components/Meals/Meals";
import Header from "~/components/Head/Head";
import getMeals from "~/lib/queries/getMeals";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import { useUser } from "~/lib/user/user";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import { getDayName } from "~/lib/date/date";
import type { Meal } from "~/types";
import AddMealButton from "~/components/AddMealButton/AddMealButton";

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
        <span class="text-lg" q:slot="center">
          {getDayName(parseInt(day, 10))}
        </span>
      </Header>
      <AddMealButton />
      <div q:slot="main">
        <Resource
          value={resources}
          onPending={() => <>loading</>}
          onRejected={() => <p>Rejected</p>}
          onResolved={({ meals }) => {
            return (
              <Meals
                q:slot="main"
                meals={meals}
                isSaving={isSaving.value}
                createHref$={$((meal: Meal) => meal.id)}
              />
            );
          }}
        />
      </div>
    </Layout>
  );
});
