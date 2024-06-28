import { type Auth } from "firebase/auth";

export type Meal = {
  id: string;
  name: string;
  eatFor: Array<"lunch" | "dinner" | "side-dish">;
};

declare global {
  interface Window {
    onAfterInitializeEmulators: (auth: Auth) => void;
  }
}
