import swapMeals from "~/lib/queries/swapMeals";
import { PlannedMeal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

const plannedMeal = (name: string): PlannedMeal => ({
  id: "id",
  name: name,
});

describe("When swapMeals is called", () => {
  it("should swap meals", async () => {
    const day1 = "d0";
    const day2 = "d1";
    const weekPlan: WeekPlan = {
      d0: {
        lunch: plannedMeal("lunch0"),
        dinner: plannedMeal("dinner0"),
      },
      d1: {
        lunch: plannedMeal("lunch1"),
        dinner: plannedMeal("dinner1"),
      },
    };
    const weekPlanAfter = swapMeals(weekPlan, day1, day2, "lunch");
    expect(weekPlanAfter.d0?.lunch?.name).to.eq("lunch1");
    expect(weekPlanAfter.d0?.dinner?.name).to.eq("dinner0");
    expect(weekPlanAfter.d1?.lunch?.name).to.eq("lunch0");
    expect(weekPlanAfter.d1?.dinner?.name).to.eq("dinner1");
  });
});
