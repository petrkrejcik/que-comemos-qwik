import WeekPlan from "~/components/WeekPlan/WeekPlan";
import { DEFAULT_WEEK_PLAN } from "../../../cypress/fixtures/weekPlans";

describe(`When <WeekPlan> is rendered`, () => {
  beforeEach(() => {
    cy.clearDb();
    cy.seedDb();
    cy.addWeekPlan("2023-05-01", DEFAULT_WEEK_PLAN);
  });

  it("should show 7 days with lunches", () => {
    cy.intercept("/api/auth", { body: {} });
    cy.mount(<WeekPlan weekId="2023-05-01" />, {
      qwikMockProps: {
        url: "/week/2023-05-01/lunch",
        params: { weekId: "2023-05-01", meal: "lunch" },
      },
    });
    cy.findAllByRole("link").should((items) => {
      expect(items[0])
        .to.contain.text("Pescado")
        .to.have.attr("href", "/week/2023-05-01/lunch/0");
      expect(items[1]).to.contain.text("Cerdo con Patatas");
      expect(items[2]).to.contain.text("Pollo");
      expect(items[3]).to.contain.text("Dorada");
      expect(items[4]).to.contain.text("Garbanzos");
      expect(items[5]).to.contain.text("Pasta");
      expect(items[6]).to.contain.text("Lentejas");
    });
  });

  it("should show dinners", () => {
    cy.intercept("/api/auth", { body: {} });
    cy.mount(<WeekPlan weekId="2023-05-01" />, {
      qwikMockProps: {
        url: "/week/2023-05-01/dinner",
        params: { weekId: "2023-05-01", meal: "dinner" },
      },
    });
    cy.findAllByRole("link").should((items) => {
      expect(items[0]).to.contain.text("Tortilla francesa");
      expect(items[1])
        .to.contain.text("Elegir")
        .to.have.attr("href", "/week/2023-05-01/dinner/1");
    });
  });
});

xdescribe(`When user drags a meal`, () => {
  describe(`and releases it above another meal`, () => {
    it("should swap the meals", () => {
      cy.intercept("/api/auth", { body: {} });
      cy.mount(<WeekPlan weekId="2023-05-01" />, {
        qwikMockProps: {
          url: "/week/2023-05-01/lunch",
          params: { weekId: "2023-05-01", meal: "lunch" },
        },
      });
      cy.findAllByRole("listitem").first().as("source");
      cy.findAllByRole("listitem").eq(1).as("target");

      cy.get("@source").should("contain.text", "Albondigas");
      cy.get("@target").should("contain.text", "Bacalao con Patatas");

      cy.get("@source").trigger("touchmove", {
        targetTouches: [{ pageX: 50, pageY: 100 }],
      });
    });
  });
});
