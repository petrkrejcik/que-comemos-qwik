import type { PropFunction } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { component$, useStore } from "@builder.io/qwik";
import type { Meal } from "~/types";

const EAT_FOR = [
  { value: "lunch", text: "Comida" },
  { value: "dinner", text: "Cena" },
  { value: "side-dish", text: "Acompañamiento" },
] as const;

type Props = {
  onAdd$?: PropFunction<(meal: Omit<Meal, "id">) => void>;
  onUpdate$?: PropFunction<(meal: Meal) => void>;
  onRemove$?: PropFunction<(meal: Meal) => void>;
  meal?: Meal;
};

const EMPTY_MEAL: Omit<Meal, "id"> = {
  name: "",
  eatFor: ["lunch"],
};

export default component$((props: Props) => {
  const form = useStore(props.meal || EMPTY_MEAL);
  const onSaveClick = $(async () => {
    if (form.name && form.eatFor.length) {
      if (props.meal) {
        await props.onUpdate$?.({
          ...form,
          id: props.meal.id,
        });
      } else {
        await props.onAdd$?.(form);
      }
      form.name = EMPTY_MEAL.name;
      form.eatFor = EMPTY_MEAL.eatFor;
    }
  });

  return (
    <form class="flex flex-col form-control" preventdefault:submit>
      <label class="label" for="meal">
        <span class="label-text">Nombre</span>
      </label>
      <input
        value={form.name}
        aria-label="Meal"
        onChange$={(e) => (form.name = e.target.value)}
        type="text"
        placeholder="Como se llama la comida?"
        class="input input-bordered"
        id="meal"
        autoComplete="off"
      />

      <label class="label mt-4" for="eatFor">
        <span class="label-text">Cuándo se come la comida?</span>
      </label>
      {!!props.meal && (
        <span class="font-bold">
          No se puede editar cuando se come la comida. Hay que crear comida
          nueva
        </span>
      )}
      {EAT_FOR.map((eatFor) => (
        <div key={eatFor.value} class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{eatFor.text}</span>
            <input
              type="checkbox"
              class="checkbox"
              checked={form.eatFor.includes(eatFor.value)}
              onChange$={() => {
                form.eatFor.includes(eatFor.value)
                  ? (form.eatFor = form.eatFor.filter(
                      (e) => e !== eatFor.value
                    ))
                  : (form.eatFor = [...form.eatFor, eatFor.value]);
              }}
            />
          </label>
          {/* <label class="label cursor-pointer">
            <span class="label-text">{eatFor.text}</span>
            <input
              type="radio"
              name="eatFor"
              class="radio checked:bg-primary"
              checked={form.eatFor === eatFor.value}
              // Do not allow changing eatFor beacuase it can mess up the planned week - it won't find the meal then
              disabled={!!props.meal}
              onChange$={() =>
                (form.eatFor = eatFor.value as "lunch" | "dinner" | "side-dish")
              }
            />
          </label> */}
        </div>
      ))}

      <div class="w-full mt-8 flex justify-between gap-24">
        <button
          type="submit"
          class="btn btn-outline btn-error"
          onClick$={() => {
            if (!props.meal) {
              return;
            }
            if (confirm("Estas seguro que quieres borrar la comida?")) {
              props.onRemove$?.(props.meal);
            }
          }}
        >
          Borrar
        </button>

        <button
          type="submit"
          class="btn btn-primary  grow"
          onClick$={onSaveClick}
        >
          Guardar
        </button>
      </div>
    </form>
  );
});
