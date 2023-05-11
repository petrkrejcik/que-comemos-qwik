import type { PlannedMeal } from "~/lib/weekPlan/weekPlanTypes";
import Meals from "./Meals";
import { $ } from "@builder.io/qwik";

const MEALS: PlannedMeal[] = [
  {
    id: "abc",
    name: "Meal 1",
    eatFor: "lunch",
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
  },
];

const mock = {
  save: $(async () => {
    return;
  }),
};

describe(`Meals component for selecting a meal`, () => {
  it("should render meals", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} isSaving={false} />);

    cy.findByRole("button", { name: "Guardar" }).should("be.disabled");
    cy.findByText("Meal 1").should("exist");
    cy.findByText("Meal 2").should("exist");
    cy.findByText("Meal 3").should("exist");
  });

  it("should highlight after click on a meal", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} isSaving={false} />);

    cy.findByText("Meal 1").click();
    cy.findByRole("option", { selected: true }).should("contain", "Meal 1");
    cy.findByText("Meal 2").click();
    cy.findByRole("option", { selected: true }).should("contain", "Meal 2");
  });

  it("should call onSelect when saved", () => {
    const onSelect = cy.spy(mock, "save");
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} isSaving={false} />);

    cy.findByText("Meal 1").click();
    cy.findByRole("button", { name: "Guardar" }).click().wrap(onSelect).should("be.called");
  });

  it("should disable the button when saving", () => {
    cy.mount(<Meals meals={MEALS} onSelect$={mock.save} isSaving={true} />);

    cy.findByRole("button", { name: "Guardar" }).should("be.disabled");
  });
});
