import { useContext } from "@builder.io/qwik";
import { UserContext } from "~/lib/user/UserProvider";

export function useUser() {
  const store = useContext(UserContext);
  return store;
}
