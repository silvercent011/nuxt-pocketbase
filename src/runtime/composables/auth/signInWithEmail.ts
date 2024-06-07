import { usePB } from "../usePB";

export async function signInWithEmail(email: string, password: string) {
  await usePB().collection("users").authWithPassword(email, password);
}
