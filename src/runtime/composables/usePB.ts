import { useNuxtApp } from "#app";

export const usePB = () => {
  const { $pb } = useNuxtApp();
  return $pb;
};
