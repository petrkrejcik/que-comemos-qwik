import { DEFAULT_WEEK_PLAN } from "../../../../../../cypress/fixtures/weekPlans";
import Day from "./index";

describe(`Day route`, () => {
  beforeEach(() => {
    cy.clearDb();
    cy.seedDb();
    cy.addWeekPlan("2023-05-01", DEFAULT_WEEK_PLAN);
  });

  it("should show loading", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch", weekId: "2023-05-01", day: "1" },
      },
    });

    cy.findByText("loading").should("be.visible");
    cy.wait(200); // Otherwise the subsequent tests will fail because of some Chai asserrtion error that element is not in document
  });

  it("should show lunches", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch", weekId: "2023-05-01", day: "1" },
      },
    });

    cy.findByText("Cerdo").should("be.visible");
    cy.findByText("Tortilla francesa").should("not.exist");
    cy.findByText("Patatas").should("not.exist");
  });

  it("Show dinners", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "dinner", weekId: "2023-01-01", day: "1" },
      },
    });

    cy.findByText("Tortilla francesa").should("be.visible");
    cy.findByText("Cerdo").should("not.exist");
    cy.findByText("Patatas").should("not.exist");
  });

  it("should show side dishes", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch-side-dish", weekId: "2023-05-01", day: "1" },
      },
    });

    cy.findByText("Cerdo").should("not.exist");
    cy.findByText("Tortilla francesa").should("not.exist");
    cy.findByText("Patatas").should("be.visible");
  });

  it("should save meal", () => {
    cy.stub(window.history, "back");

    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch", weekId: "2023-05-01", day: "1" },
      },
    });

    cy.findByText("Cerdo").parent().click();
    cy.findByRole("button", { name: "Elegir Cerdo" })
      .should("be.visible")
      .click();
    cy.window().its("history.back").should("be.called");
  });
});
