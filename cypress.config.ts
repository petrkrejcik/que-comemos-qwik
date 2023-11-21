import { defineConfig } from "cypress";
import firebaseJson from './firebase.json'
import firebaseConfig from './src/lib/firebase/firebaseConfig'

export default defineConfig({
  viewportWidth: 412,
  viewportHeight: 732,
  env: {
    firebase: {
      appId: firebaseConfig.apiKey,
      projectId: firebaseConfig.projectId,
      auth: {
        host: `http://${firebaseJson.emulators.auth.host}:${firebaseJson.emulators.auth.port}`
      },
      firestore: {
        host: `http://${firebaseJson.emulators.firestore.host}:${firebaseJson.emulators.firestore.port}`
      }
    }
  },

  component: {
    devServer: {
      framework: "cypress-ct-qwik",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
