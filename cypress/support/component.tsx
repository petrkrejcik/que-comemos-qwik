// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress-ct-qwik";

import { addQwikLoader } from "cypress-ct-qwik";
import type { JSXNode } from "@builder.io/qwik";
import UserProviderMock from "../../src/lib/user/UserProviderMock";
import initializeEmulators from "../../src/lib/firebase/initializeEmulators";
import getAuth from "~/lib/firebase/auth";
import { DEFAULT_USER } from "../fixtures/users";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        element: JSXNode,
        options?: {
          qwikMockProps?: { url?: string; params?: Record<string, string> };
        }
      ): Cypress.Chainable<unknown>;
    }
  }
}

Cypress.Commands.add("mount", (content, { qwikMockProps } = {}) => {
  mount(
    <QwikCityMockProvider
      {...qwikMockProps}
      {...(qwikMockProps?.url && {
        url: `${Cypress.config().baseUrl}/${qwikMockProps.url.replace(
          /^\//,
          ""
        )}`,
      })}
    >
      <UserProviderMock user={DEFAULT_USER}>{content}</UserProviderMock>
    </QwikCityMockProvider>
  );
});

// Example use:
// cy.mount(MyComponent)
addQwikLoader();

before(() => {
  initializeEmulators(getAuth());
});

beforeEach(() => {
  console.clear();
});
