import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { HiPlusOutline } from "@qwikest/icons/heroicons";
import ChooseSideDish from "~/components/ChooseSideDish/ChooseSideDish";
import Meal from "~/components/Meals/Meal";
import useDaytime from "~/hooks/useDaytime";
import type { PlannedMeal } from "~/lib/weekPlan/weekPlanTypes";
import type { Meal as MealType } from "~/types";

type Props = {
  plannedMeal: PlannedMeal;
  onSave$: PropFunction<(plannedMeal: PlannedMeal | undefined) => void>;
};

export default component$((props: Props) => {
  const { weekId, day } = useLocation().params;
  const daytime = useDaytime();
  const isChoosingSideDish = useSignal(false);
  const isSaving = useSignal(false);
  const sideDishes = useSignal(props.plannedMeal.sideDishes || []);

  const onSideDishSelect = $((sideDish: MealType) => {
    // Allowing only one side dish ATM (for sake of simplicity)
    sideDishes.value = [
      {
        id: sideDish.id,
        name: sideDish.name,
      },
    ];
    isChoosingSideDish.value = false;
  });

  const save = (plannedMeal: PlannedMeal | undefined) =>
    $(() => {
      isSaving.value = true;

      try {
        if (plannedMeal) {
          props.onSave$({
            id: plannedMeal.id,
            name: plannedMeal.name,
            sideDishes: sideDishes.value.map((sideDish) => sideDish),
          });
        } else {
          props.onSave$(undefined);
        }
      } finally {
        isSaving.value = false;
      }
    });

  if (isChoosingSideDish.value) {
    return <ChooseSideDish onSelect$={onSideDishSelect} />;
  }

  return (
    <div>
      <Meal
        meal={props.plannedMeal}
        href={`/week/${weekId}/${daytime}/${day}`}
        menu={[
          {
            title: "Editar",
            href: `/meals/${props.plannedMeal.id}`,
          },
          {
            title: "Eliminar",
            onClick$: save(undefined),
          },
        ]}
      />
      <div class="divider">Acompañamiento</div>
      <div>
        {sideDishes.value.map((sideDish) => (
          <Meal
            key={sideDish.id}
            meal={sideDish}
            onClick$={() => {
              isChoosingSideDish.value = true;
            }}
            menu={[
              {
                title: "Eliminar",
                onClick$: $(() => {
                  sideDishes.value = [];
                }),
              },
            ]}
          />
        ))}
        {sideDishes.value.length === 0 && (
          <button
            class="btn btn-ghost mt-2"
            aria-label={`Elegir`}
            onClick$={() => (isChoosingSideDish.value = true)}
          >
            <HiPlusOutline /> Añadir acompañamiento
          </button>
        )}
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-8 w-full"
        onClick$={save(props.plannedMeal)}
      >
        Guardar
      </button>
    </div>
  );
});
