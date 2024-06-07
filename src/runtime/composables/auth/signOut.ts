import { usePB } from "../usePB";

export function signOut() {
  usePB().authStore.clear();
}
