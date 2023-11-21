import "@testing-library/cypress/add-commands";
import "cypress-wait-until";
import { addDocument, fetchFirestore } from "./firebase/rest";
import { signInWithEmailAndPassword } from "firebase/auth";
import { DEFAULT_USER } from "../fixtures/users";
import { MEALS } from "../fixtures/meals";

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      visitAsLogged(
        url: string,
        user?: { email: string; password: string },
        options?: Partial<VisitOptions>
      ): Chainable<void>;
      logout(): Chainable<void>;
      clearFirebaseAuth(): Chainable<void>;
      clearDb(): Chainable<void>;
      seedDb(): Chainable<void>;
      addDocument(path: string, content: any): Chainable<void>;
      addMeal(meal: any, groupId?: string): Chainable<void>;
      addWeekPlan(
        weekId: string,
        weekPlan: any,
        groupId?: string
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add("visitAsLogged", (url, user, options) => {
  const userToUse = user || DEFAULT_USER;
  cy.visit(url, {
    ...options,
    onBeforeLoad: (win) => {
      win.onAfterInitializeEmulators = (auth) => {
        signInWithEmailAndPassword(auth, userToUse.email, userToUse.password);
      };
    },
  });
  cy.waitUntil(() =>
    cy.getCookie("user_token").then((cookie) => Boolean(cookie && cookie.value))
  );
});

Cypress.Commands.add("clearFirebaseAuth", () => {
  cy.wrap(null).then(() => {
    return new Cypress.Promise(async (resolve) => {
      const req = indexedDB.deleteDatabase("firebaseLocalStorageDb");
      req.onsuccess = function () {
        resolve();
      };
    });
  });
});

Cypress.Commands.add("logout", () => {
  Cypress.log({
    displayName: "logout",
  });
  cy.clearFirebaseAuth();
});

Cypress.Commands.add("clearDb", () => {
  Cypress.log({ displayName: "clearDb" });
  cy.wrap(null).then(() => {
    return fetchFirestore("documents", { method: "DELETE" });
  });
});

Cypress.Commands.add("addDocument", (path, content) => {
  Cypress.log({ displayName: "addDocument" });
  cy.wrap(null).then(() => {
    addDocument(path, content);
  });
});

Cypress.Commands.add("addMeal", (meal, groupId) => {
  Cypress.log({ displayName: "addMeal" });
  const { id, ...mealToSave } = meal;
  const groupIdToUse = groupId || DEFAULT_USER.groupId;
  cy.addDocument(`groups/${groupIdToUse}/meals?documentId=${id}`, mealToSave);
});

Cypress.Commands.add("addWeekPlan", (weekId, weekPlan, groupId) => {
  Cypress.log({ displayName: "addWeekPlan" });

  const groupIdToUse = groupId || DEFAULT_USER.groupId;
  cy.addDocument(
    `groups/${groupIdToUse}/weekPlans?documentId=${weekId}`,
    weekPlan
  );
});

Cypress.Commands.add("seedDb", () => {
  Cypress.log({ displayName: "seedDb" });

  MEALS.forEach((meal) => {
    cy.addMeal(meal);
  });
});
