import { addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";

export interface PBModuleOptions {
  pb_url: string;
  ssrAuthCookie: boolean;
}

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    pb: PBModuleOptions;
  }
}

export default defineNuxtModule<PBModuleOptions>({
  meta: {
    name: "nuxt-pocketbase",
    configKey: "pb",
  },
  defaults: {
    pb_url: "http://127.0.0.1:8090",
    ssrAuthCookie: false,
  },
  setup(_options, _nuxt) {
    const moduleOptions: PBModuleOptions = defu(
      _nuxt.options.runtimeConfig.public.pb,
      _options
    );
    _nuxt.options.runtimeConfig.public.pb = moduleOptions;

    const resolver = createResolver(import.meta.url);

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
