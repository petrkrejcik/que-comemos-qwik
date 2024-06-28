import Header from "~/components/Head/Head";
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Meals from "~/components/Meals/Meals";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import getMeals from "~/lib/queries/getMeals";
import { useUser } from "~/lib/user/user";
import { Loading } from "~/components/Loading/Loading";
import AddMealButton from "~/components/AddMealButton/AddMealButton";
import type { Meal } from "~/types";

export default component$(() => {
  const { groupId } = useUser();
  const loadMeals = useResource$(async () => {
    const meals = await getMeals(groupId);

    return { meals };
  });

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
      <div q:slot="main">
        <AddMealButton />
        <Resource
          value={loadMeals}
          onPending={() => <Loading />}
          onRejected={(e) => {
            console.error(e);
            return <p>Rejected</p>;
          }}
          onResolved={({ meals }) => (
            <Meals meals={meals} createHref$={(meal: Meal) => meal.id} />
          )}
        />
      </div>
    </Layout>
  );
});

export const head: DocumentHead = {
  title: "Lista de comidas",
  meta: [
    {
      name: "description",
      content: "Todas las comidas",
    },
  ],
};
