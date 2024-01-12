// Utilities
import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
  state: () => ({
    apiUrl: "http://178.16.143.152:3000/",
    // apiUrl: "http://localhost:3000/",
    addressUrl: "https://dzakwandp.github.io/api-wilayah-indonesia/api/",
  }),
});
