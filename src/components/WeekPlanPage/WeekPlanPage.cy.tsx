import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";

describe(`When <WeekPlan> is rendered`, () => {
  it("should show 7 days with meals", () => {
    // cy.intercept("/api/auth", { body: {} });
    cy.mount(<WeekPlanPage weekId="2023-05-01" />, {
      qwikMockProps: {
        url: "/week/2023-05-01/lunch",
        params: { weekId: "2023-05-01", meal: "lunch" },
      },
    });
  });
});
