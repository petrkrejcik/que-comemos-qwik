import Day from "./index";

describe(`Day route`, () => {
  it("should show loading", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch", weekId: "2020-01-01", day: "1" },
      },
    });

    cy.findByText("loading").should("be.visible");
    cy.wait(200); // Otherwise the subsequent tests will fail because of some Chai asserrtion error that element is not in document
  });

  it("should show lunches", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch", weekId: "2020-01-01", day: "1" },
      },
    });

    cy.findByText("Albondigas").should("be.visible");
    cy.findByText("Patatas").should("not.exist");
  });

  it("should show side dishes", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch-side-dish", weekId: "2020-01-01", day: "1" },
      },
    });

    cy.findByText("Albondigas").should("not.exist");
    cy.findByText("Patatas").should("be.visible");
  });

  it("should save meal", () => {
    cy.stub(window.history, "back");

    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "lunch", weekId: "2020-01-01", day: "1" },
      },
    });

    cy.findByText("Albondigas").parent().click();
    cy.findByRole("button", { name: "Elegir Albondigas" })
      .should("be.visible")
      .click();
    cy.window().its("history.back").should("be.called");
  });

  it("Show dinners", () => {
    cy.mount(<Day />, {
      qwikMockProps: {
        params: { meal: "dinner", weekId: "2020-01-01", day: "1" },
      },
    });

    cy.findByText("Pizza").should("be.visible");
    cy.findByText("Albondigas").should("not.exist");
  });
});
