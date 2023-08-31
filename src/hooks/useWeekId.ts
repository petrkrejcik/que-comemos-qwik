import { useLocation } from "@builder.io/qwik-city";
import { getMonday, toWeekId } from "~/lib/date/date";

export default function useWeekId() {
  const { weekId } = useLocation().params;

  return weekId || toWeekId(getMonday());
}
