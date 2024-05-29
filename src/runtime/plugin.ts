import { defineNuxtPlugin, useCookie, useRuntimeConfig } from "#app";
import type { BaseAuthStore } from "pocketbase";
import PocketBase from "pocketbase";

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig().public;

  const pb = new PocketBase(runtimeConfig.pb.pb_url);

  const cookie = useCookie<BaseAuthStore>("pb_auth", {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: runtimeConfig.pb.ssrAuthCookie,
    maxAge: 604800,
  });

  pb.authStore.save(cookie.value?.token, cookie.value?.model);

  pb.authStore.onChange(() => {
    // @ts-expect-error - `cookie.value` is partial
    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model,
    };
  });

  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }

  return {
    provide: { pb },
  };
});
