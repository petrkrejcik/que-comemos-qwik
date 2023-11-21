/**
 * @todo Test is failing because the feature is not implemented yet.
 */
// xdescribe(`When a user selects a side-dish first`, () => {
//   it("should select also a current meal", () => {
//     // BOH: This doesn't affect server time.
//     cy.clock(new Date("2023-05-01T08:15:00.000+00:00").valueOf(), ["Date"]);
//     cy.visitAsLogged(`/week/2023-05-08`);

//     cy.findByRole("link", { name: "Elegir Lunes" }).click();
//     cy.findByText("Bacalao").click({ force: true, waitForAnimations: true });
//     cy.findByRole("button", { name: "Acompañamiento para Bacalao" }).click({
//       force: true,
//     });
//     cy.findByText("Patatas").click({ force: true, waitForAnimations: true });
//     cy.findByRole("button", { name: "Elegir Patatas" }).click({
//       force: true,
//     });
//     // cy.findByRole("button", { name: "Back" }).click();
//     cy.visit(`http://localhost:5173/week/2023-05-08`);
//     cy.findByText("Bacalao con Patatas").should("be.visible");
//   });
// });

describe(`When user selects a meal`, () => {
  describe(`and there was previously meal with a side-dish`, () => {
    before(() => {
      cy.logout();
      cy.clearDb();
      cy.seedDb();
      cy.addWeekPlan("2023-05-01", {
        d0: {
          lunch: {
            id: "pescado",
            name: "Pescado",
          },
          "lunch-side-dish": {
            id: "arroz",
            name: "Arroz",
          },
        },
      });
    });

    it("the side-dish should be removed", () => {
      cy.clock(new Date("2023-05-01T08:15:00.000+00:00").valueOf(), ["Date"]);
      cy.visitAsLogged(`/week/2023-05-01/lunch`);

      cy.findByText("Pescado con Arroz").click();
      // @todo The app should scroll to the meal and activate it.
      cy.findByText("Añadir comida nueva").should("be.visible");
      cy.findByText("Cerdo").click({ force: true });
      cy.findByRole("button", { name: "Elegir Cerdo" }).click({
        force: true,
      });
      cy.findByText("Cerdo").should("be.visible");
    });
  });
});

// @todo Add test when `lunch` is not part of URL
