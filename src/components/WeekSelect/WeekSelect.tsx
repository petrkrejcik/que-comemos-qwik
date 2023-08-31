import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  HiChevronLeftOutline,
  HiChevronRightOutline,
} from "@qwikest/icons/heroicons";
import useDaytime from "~/hooks/useDaytime";
import {
  decrementWeek,
  toWeekId,
  incrementWeek,
  getWeekRelative,
} from "~/lib/date/date";

type Props = {
  weekId: string;
};

export default component$((props: Props) => {
  const daytime = useDaytime();
  // The hook is needed in order to re-render page when props.weekId changes.
  // I don't understand why it's needed. IMHO the component should be re-rendered when props change.
  useVisibleTask$(() => {
    // const a = props.weekId;
  });

  return (
    <div class="flex items-center gap-2">
      <Link
        href={`/week/${toWeekId(decrementWeek(props.weekId))}/${daytime}`}
        class="btn  btn-ghost text-3xl"
      >
        <HiChevronLeftOutline />
      </Link>
      <div class="text-lg grow">{getWeekRelative(props.weekId)}</div>
      <Link
        href={`/week/${toWeekId(incrementWeek(props.weekId))}/${daytime}`}
        class="btn btn-ghost text-3xl"
      >
        <HiChevronRightOutline />
      </Link>
    </div>
  );
});
