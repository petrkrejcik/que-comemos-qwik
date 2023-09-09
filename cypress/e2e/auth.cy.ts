describe("When a user opens the page", () => {
  describe("and is not logged", () => {
    it("will show loaders in week plan and after that login button", () => {
      cy.visit(`http://localhost:4173`);
      cy.findByText(/esta semana/i).should("be.visible");
      cy.findAllByRole("progressbar").should("have.length", 7);
      cy.findByRole("button", { name: "Login using Google" }).should(
        "be.visible"
      );
    });

    it("SSR - will show loaders in week plan and after that login button", () => {
      cy.request({
        url: `http://localhost:4173`,
        headers: { accept: "text/html" },
      })
        .its("body")
        .then((html) => {
          const $body = Cypress.$(html).find("[role='progressbar']");
          expect($body).to.have.property("length").equal(7);
        });
    });
  });
});
