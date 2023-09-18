import WeekPlan from "~/components/WeekPlan/WeekPlan";

describe(`When <WeekPlan> is rendered`, () => {
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
        .to.contain.text("Albondigas")
        .to.have.attr("href", "/week/2023-05-01/lunch/0");
      expect(items[1]).to.contain.text("Bacalao con Patatas");
      expect(items[2]).to.contain.text("Chilli con carne");
      expect(items[3]).to.contain.text("Dorada");
      expect(items[4]).to.contain.text("Estofado");
      expect(items[5]).to.contain.text("Fideua");
      expect(items[6]).to.contain.text("Garbanzos");
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
      expect(items[0]).to.contain.text("Chilli con carne");
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
