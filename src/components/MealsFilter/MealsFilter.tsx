import { component$ } from "@builder.io/qwik";
import type useMealsFilter from "~/components/MealsFilter/useMealsFilter";
import { EAT_FOR } from "~/lib/constants";

type Props = {
  filter: ReturnType<typeof useMealsFilter>;
};

export default component$((props: Props) => {
  return (
    <div class="flex gap-2 my-4">
      {EAT_FOR.map((eatFor) => (
        <div
          key={eatFor.value}
          class="badge flex gap-2 cursor-pointer"
          onClick$={() => {
            props.filter.toggle(eatFor.value);
          }}
        >
          <input
            type="checkbox"
            class="checkbox checkbox-xs"
            checked={props.filter.values.includes(eatFor.value)}
          />
          {eatFor.text}
        </div>
      ))}
    </div>
  );
});
