import type { PropFunction } from "@builder.io/qwik";
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Meals from "~/components/Meals/Meals";
import getMeals from "~/lib/queries/getMeals";
import { useUser } from "~/lib/user/user";
import type { Meal } from "~/types";

type Props = {
  onSelect$: PropFunction<(meal: Meal) => void>;
};

export default component$((props: Props) => {
  const { groupId } = useUser();
  const { mealId } = useLocation().params;
  const resources = useResource$(async ({ track }) => {
    track(() => mealId);
    const sideDishes = await getMeals(groupId, ["side-dish"]);

    return { sideDishes };
  });

  return (
    <Resource
      value={resources}
      onPending={() => <>loading</>}
      onRejected={() => <p>Rejected</p>}
      onResolved={({ sideDishes }) => {
        return <Meals meals={sideDishes} onClick$={props.onSelect$} />;
      }}
    />
  );
});
