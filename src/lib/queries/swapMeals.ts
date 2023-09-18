import { produce } from "immer";
import { DayNumber, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default (weekPlan: WeekPlan, day1: DayNumber, day2: DayNumber, daytime: "lunch" | "dinner") => {
  return produce(weekPlan, (draft) => {
    if (!draft[day1] || !draft[day2]) return;
    const meal1 = draft[day1]?.[daytime];
    const meal2 = draft[day2]?.[daytime];
    if (draft["d0"]) {
      draft["d0"][daytime] = meal2;
    }
    (draft[day1] || {})[daytime] = meal2; // TS needs `|| {}`
    (draft[day2] || {})[daytime] = meal1;
  });
};
