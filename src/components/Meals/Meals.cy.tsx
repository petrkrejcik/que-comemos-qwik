import Meals from "./Meals";
import { $ } from "@builder.io/qwik";
import type { Meal } from "~/types";

const MEALS: Meal[] = [
  {
    id: "abc",
    name: "Meal 1",
    eatFor: "lunch",
    withSideDish: true,
  },
  {
    id: "def",
    name: "Meal 2",
    eatFor: "dinner",
  },
  {
    id: "ghi",
    name: "Meal 3",
    eatFor: "lunch",
    withSideDish: true,
  },
  {
    id: "xyz",
    name: "Sidedish 1",
    eatFor: "side-dish",
  },
];

const mock = {
  save: $(async () => {
    return;
  }),
};

describe(`Meals component for selecting a meal`, () => {
  it("should render meals", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} />);

    cy.findByText("Meal 1").should("exist");
    cy.findByText("Meal 2").should("exist");
    cy.findByText("Meal 3").should("exist");
  });

  it("should highlight after click on a meal", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} />);

    cy.findByRole("button", { name: "Elegir Meal 1" }).should("not.be.visible");
    cy.findByText("Meal 1").click();
    cy.findByRole("button", { name: "Elegir Meal 1" }).should("be.visible");
    cy.findByText("Meal 2").click();
    cy.findByRole("button", { name: "Elegir Meal 1" }).should("not.be.visible");
    cy.findByRole("button", { name: "Elegir Meal 2" }).should("be.visible");
  });

  it("should call onSelect when saved", () => {
    const onSelect = cy.spy(mock, "save");
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} />);

    cy.findByText("Meal 1").click();
    cy.findByRole("button", { name: "Elegir Meal 1" })
      .should("be.visible")
      .click()
      .wrap(onSelect)
      .should("be.called");
  });

  it("should disable the button when saving", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} isSaving={true} />);

    cy.findByText("Meal 1").click();
    cy.findByRole("button", { name: "Elegir Meal 1" }).should(
      "have.class",
      "loading"
    );
  });

  it("Choose sidedish button should be visible for meals with sidedish enabled", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} />);

    cy.findByText("Meal 1").click();
    cy.findByRole("button", { name: "Acampañamiento para Meal 1" }).should(
      "be.visible"
    );
    cy.findByText("Meal 2").click();
    cy.findByRole("button", { name: "Acampañamiento para Meal 2" }).should(
      "not.exist"
    );
    cy.findByText("Meal 3").click();
    cy.findByRole("button", { name: "Acampañamiento para Meal 3" }).should(
      "be.visible"
    );
  });

  it("should have a button to open sidedish list", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} />, {
      qwikMockProps: {
        params: { weekId: "2020-01-01", day: "1" },
      },
    });

    cy.findByText("Meal 1").click();
    cy.findByRole("button", { name: "Acampañamiento para Meal 1" }).should(
      "have.attr",
      "href",
      "/week/2020-01-01/lunch-side-dish/1"
    );
  });
});
