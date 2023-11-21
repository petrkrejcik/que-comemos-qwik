import {
  component$,
  useStyles$,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import initializeEmulators from "~/lib/firebase/initializeEmulators";
import getAuth from "~/lib/firebase/auth";

import globalStyles from "./global.css?inline";

type Props = {
  shouldUseEmulators?: boolean;
};

export default component$((props: Props) => {
  useTask$(() => {
    if (props.shouldUseEmulators) {
      initializeEmulators(getAuth());
    }
  });

  useVisibleTask$(() => {
    if (props.shouldUseEmulators) {
      initializeEmulators(getAuth());
      if (window.onAfterInitializeEmulators) {
        window.onAfterInitializeEmulators(getAuth());
      }
    }
  });
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
