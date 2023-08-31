import DaytimeSelect from "~/components/DaytimeSelect/DaytimeSelect";

describe(`When <DayTimeSelect> is rendered`, () => {
  it("should show Lunch and Dinner with selected item", () => {
    cy.mount(<DaytimeSelect />, {
      qwikMockProps: {
        url: "/week/2023-05-01/lunch",
        params: { weekId: "2023-05-01", meal: "lunch" },
      },
    });
    cy.findByRole("listitem", { name: "Lunch" })
      .should("be.visible")
      .should("have.attr", "aria-selected", "true")
      .find("a")
      .should("have.attr", "href", "/week/2023-05-01/lunch");
    cy.findByRole("listitem", { name: "Dinner" })
      .should("be.visible")
      .should("have.attr", "aria-selected", "false")
      .find("a")
      .should("have.attr", "href", "/week/2023-05-01/dinner");
  });

  it("should have correct URL without weekId", () => {
    cy.clock(new Date("2023-05-01"), ["Date"]);
    cy.mount(<DaytimeSelect />);
    cy.findByRole("listitem", { name: "Lunch" })
      .find("a")
      .should("have.attr", "href", "/week/2023-05-01/lunch");
    cy.findByRole("listitem", { name: "Dinner" })
      .find("a")
      .should("have.attr", "href", "/week/2023-05-01/dinner");
  });
});
