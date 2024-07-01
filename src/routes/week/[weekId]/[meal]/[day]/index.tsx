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
import useDaytime from "~/hooks/useDaytime";
import useMealsFilter from "~/components/MealsFilter/useMealsFilter";
import MealsFilter from "~/components/MealsFilter/MealsFilter";

export default component$(() => {
  const { groupId } = useUser();
  const { weekId, day, meal } = useLocation().params;
  const eatFor = useDaytime();
  const mealsFilter = useMealsFilter([eatFor]);
  const resources = useResource$(async ({ track }) => {
    track(() => meal);
    const meals = await getMeals(groupId);
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
        <MealsFilter filter={mealsFilter} key={mealsFilter.values.join("")} />
        <Resource
          value={resources}
          onPending={() => <>loading</>}
          onRejected={() => <p>Rejected</p>}
          onResolved={({ meals }) => {
            return (
              <Meals
                q:slot="main"
                meals={meals.filter((m) =>
                  m.eatFor.some((eatFor) => mealsFilter.values.includes(eatFor))
                )}
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
