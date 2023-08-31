import type { PropFunction } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { component$, useStore } from "@builder.io/qwik";
import type { Meal } from "~/types";

const EAT_FOR = [
  { value: "lunch", text: "Comida" },
  { value: "dinner", text: "Cena" },
  { value: "side-dish", text: "Acompañamiento" },
];

type Props = {
  onSave$: PropFunction<(meal: Omit<Meal, "id">) => void>;
  meal?: Meal;
};

const EMPTY_MEAL: Omit<Meal, "id"> = {
  name: "",
  eatFor: "lunch",
  withSideDish: false,
};

export default component$((props: Props) => {
  const form = useStore(props.meal || EMPTY_MEAL);
  const onSaveClick = $(() => {
    if (form.name) {
      props.onSave$(form);
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

      <label class="label" for="eatFor">
        <span class="label-text">Cuándo se come la comida?</span>
      </label>
      <select
        class="select select-bordered w-full max-w-xs"
        aria-label="Eat for"
        id="eatFor"
        onChange$={(e) =>
          (form.eatFor = e.target.value as "lunch" | "dinner" | "side-dish")
        }
        value={form.eatFor}
      >
        {EAT_FOR.map((eatFor) => (
          <option value={eatFor.value} key={eatFor.value}>
            {eatFor.text}
          </option>
        ))}
      </select>

      <label class="cursor-pointer label">
        <span class="label-text">Puede tener acompañamiento?</span>
        <input
          type="checkbox"
          class="checkbox"
          checked={!!form.withSideDish}
          aria-label="Puede tener acompañamiento?"
          onChange$={(e) => {
            form.withSideDish = e.target.checked;
          }}
        />
      </label>

      <button type="submit" class="btn btn-primary mt-8" onClick$={onSaveClick}>
        Guardar
      </button>
    </form>
  );
});
