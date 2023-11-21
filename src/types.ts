import { type Auth } from "firebase/auth";

export type Meal = {
  id: string;
  name: string;
  eatFor: "lunch" | "dinner" | "side-dish" | "";
  withSideDish?: boolean;
};

declare global {
  interface Window {
    onAfterInitializeEmulators: (auth: Auth) => void;
  }
}
