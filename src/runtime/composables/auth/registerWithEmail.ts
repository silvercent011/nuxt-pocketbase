import { usePB } from "../usePB";

export async function registerWithEmail(email: string, password: string) {
  await usePB().collection("users").create({
    email: email,
    password: password,
    passwordConfirm: password,
  });
}
