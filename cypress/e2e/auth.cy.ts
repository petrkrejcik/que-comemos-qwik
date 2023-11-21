describe("When a user opens the page", () => {
  describe("and is not logged", () => {
    beforeEach(() => {
      cy.logout();
      cy.clearDb();
    });

    it("will show loaders in week plan and after that login button", () => {
      cy.visit(`/`);
      cy.findByText(/esta semana/i).should("be.visible");
      cy.findAllByRole("progressbar").should("have.length", 7);
      cy.findByRole("button", { name: "Login using Google" }).should(
        "be.visible"
      );
    });

    it("SSR - will show loaders in week plan and after that login button", () => {
      cy.request({
        url: `/`,
        headers: { accept: "text/html" },
      })
        .its("body")
        .then((html) => {
          const $body = Cypress.$(html).find("[role='progressbar']");
          expect($body).to.have.property("length").equal(7);
        });
    });
  });

  describe("and is logged", () => {
    beforeEach(() => {
      cy.logout();
      cy.clearDb();
    });

    it("SSR will return HTML without loaders", () => {
      cy.visitAsLogged(`/`);
      cy.request({
        url: `/`,
        headers: { accept: "text/html" },
      })
        .its("body")
        .then((html) => {
          const $body = Cypress.$(html).find("[role='progressbar']");
          expect($body).to.have.property("length").equal(0);
          // @todo check some selected meals
        });
    });
  });
});
