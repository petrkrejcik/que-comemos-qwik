/**
 * @todo Test is failing because the feature is not implemented yet.
 */
xdescribe(`When a user selects a side-dish first`, () => {
  it("should select also a current meal", () => {
    // BOH: This doesn't affect server time.
    cy.clock(new Date("2023-05-01T08:15:00.000+00:00").valueOf(), ["Date"]);
    cy.setCookie(
      "user_token",
      "eyJhbGciOiJIUzI1NiJ9.eyJncm91cElkIjoibW9qZTNEU0pqbk5ub0dmRDFnbEsiLCJ1c2VySWQiOiJlSm9EaVNlTEZFWG45SzJoeW9ucG5sRTZ6TXFCIiwianRpIjoicDJjSldjdzdMUkl0LUNrdGJLcWRiIiwiaWF0IjoxNjk0MzgxNTA3LCJleHAiOjE2OTUyNDU1MDd9.AzZkgz6nVzly0llYVDRUMVQ6boGfPXZkUNjPKmeA92w"
    );
    cy.visit(`http://localhost:5173/week/2023-05-08`);

    cy.findByRole("link", { name: "Elegir Lunes" }).click();
    cy.findByText("Bacalao").click({ force: true, waitForAnimations: true });
    cy.findByRole("button", { name: "Acompañamiento para Bacalao" }).click({
      force: true,
    });
    cy.findByText("Patatas").click({ force: true, waitForAnimations: true });
    cy.findByRole("button", { name: "Elegir Patatas" }).click({
      force: true,
    });
    // cy.findByRole("button", { name: "Back" }).click();
    cy.visit(`http://localhost:5173/week/2023-05-08`);
    cy.findByText("Bacalao con Patatas").should("be.visible");
  });
});
