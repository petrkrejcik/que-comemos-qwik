import type { PlannedMeal } from "~/lib/weekPlan/weekPlanTypes";
import { $ } from "@builder.io/qwik";
import MealForm from "~/components/MealForm/MealForm";
import type { Meal } from "~/types";

const meal: Meal = {
  name: "Some meal",
  eatFor: "side-dish",
  withSideDish: true,
};

const mock = {
  onSave$: $(async () => {
    return;
  }),
};

describe(`Form for adding and editing a meal`, () => {
  it("should render the form", () => {
    cy.mount(<MealForm onSave$={mock.onSave$} />);

    cy.findByRole("textbox", { name: "Meal" }).should("be.visible").should("be.empty");
    cy.findByRole("combobox", { name: "Eat for" })
      .should("be.visible")
      .should("contain.text", "ComidaCenaAcompañamiento");
    cy.findByRole("checkbox", { name: "Puede tener acompañamiento?" }).should("be.visible").should("not.be.checked");
    cy.findByRole("button", { name: "Guardar" }).should("be.visible");
  });

  it("should not save if name is not filled", () => {
    const onSave = cy.spy(mock, "onSave$");
    cy.mount(<MealForm onSave$={mock.onSave$} />);

    cy.findByRole("button", { name: "Guardar" }).click().wrap(onSave).should("be.not.be.called");
  });

  it("should save with correct values", () => {
    const onSave = cy.spy(mock, "onSave$");
    cy.mount(<MealForm onSave$={mock.onSave$} />);

    cy.findByRole("textbox", { name: "Meal" }).type("A name");
    cy.findByRole("combobox", { name: "Eat for" }).select("dinner");
    cy.findByRole("checkbox", { name: "Puede tener acompañamiento?" }).click();

    cy.findByRole("button", { name: "Guardar" })
      .click()
      .wrap(onSave)
      .should("be.calledWith", { name: "A name", eatFor: "dinner", withSideDish: true });
  });

  it("should render the form with prefilled meal", () => {
    cy.mount(<MealForm onSave$={mock.onSave$} meal={meal} />);

    cy.findByRole("textbox", { name: "Meal" }).should("have.value", "Some meal");
    cy.findByRole("combobox", { name: "Eat for" })
      .should("have.value", "side-dish")
    cy.findByRole("checkbox", { name: "Puede tener acompañamiento?" }).should("be.checked");
  });
});
