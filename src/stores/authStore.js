import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    email: null,
    isLoggedIn: false,
  }),
  actions: {
    getToken(token) {
      this.accessToken = token;
    },
    login(response) {
      (this.isLoggedIn = true), (this.email = response.email);
    },
    logout() {
      (this.accessToken = null), (this.email = null), (this.isLoggedIn = false);
    },
  },
  getters: {
    loginStatus() {
      return this.isLoggedIn;
    },
    getUsername() {
      return this.name;
    },
    getRole() {
      return this.role;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
