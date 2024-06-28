import Header from "~/components/Head/Head";
import { $, Resource, component$, useResource$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import { useUser } from "~/lib/user/user";
import { Loading } from "~/components/Loading/Loading";
import type { Meal } from "~/types";
import MealForm from "~/components/MealForm/MealForm";
import updateMeal from "~/lib/queries/updateMeal";
import removeMeal from "~/lib/queries/removeMeal";
import getMeal from "~/lib/queries/getMeal";

export default component$(() => {
  const { groupId } = useUser();
  const { mealId } = useLocation().params;
  const loadMeal = useResource$(async () => {
    const meal = await getMeal(groupId, mealId);

    return { meal };
  });

  const onRemoveClick = $(async (meal: Meal) => {
    await removeMeal(groupId, meal);
    history.back();
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
        <span q:slot="center">Editar</span>
      </Header>
      <div q:slot="main">
        <Resource
          value={loadMeal}
          onPending={() => <Loading />}
          onRejected={() => <p>Rejected</p>}
          onResolved={({ meal }) => (
            <MealForm
              meal={meal}
              onUpdate$={async (updatedMeal) => {
                await updateMeal(groupId, updatedMeal);
                history.back();
              }}
              onRemove$={onRemoveClick}
            />
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
