import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { decrementWeek, toWeekId, incrementWeek } from "~/lib/date/date";

type Props = {
  weekId: string;
};

export default component$((props: Props) => {
  // The hook is needed in order to re-render page when props.weekId changes.
  // I don't understand why it's needed. IMHO the component should be re-rendered when props change.
  useVisibleTask$(() => {
    const a = props.weekId;
  });

  return (
    <div class="flex items-center gap-2">
      <Link href={`/week/${toWeekId(decrementWeek(props.weekId))}`} class="btn btn-circle btn-ghost text-xl">
        ❮
      </Link>
      <div class="text-lg grow">{props.weekId}</div>
      <Link href={`/week/${toWeekId(incrementWeek(props.weekId))}`} class="btn btn-circle btn-ghost text-xl">
        ❯
      </Link>
    </div>
  );
});
