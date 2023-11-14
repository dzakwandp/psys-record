<template lang="">
  <div class="flex h-screen justify-center items-center bg-base-100">
    <div class="flex flex-col h-max p-6 w-1/4 bg-neutral text-white rounded-lg">
      <div class="text-2xl">Welcome!</div>
      <div class="text-base">Silahkan masuk untuk menggunakan program ini.</div>

      <!-- login field -->
      <div class="my-4 px-2 w-full text-neutral">
        <!-- username -->
        <input
          v-model="username"
          class="input input-bordered border-accent w-full mb-4"
          placeholder="username" />
        <!-- password -->
        <input
          v-model="password"
          type="password"
          class="input input-bordered border-accent w-full"
          placeholder="password" />
      </div>

      <div class="flex w-full my-4 justify-center">
        <button
          class="h-10 px-4 py-2 text-sm rounded outline outline-1 text-white outline-white hover:bg-accent hover:text-white hover:outline-neutral transition-all duration-500"
          @click="onLogin()">
          <div v-if="loading" class="loading loading-spinner"></div>
          <div v-else>Masuk</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useEnvStore } from "@/stores/envStore";
import { useAuthStore } from "@/stores/authStore";
export default {
  data() {
    return {
      username: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    async onLogin() {
      this.loading = true;
      try {
        const login = await axios.post(useEnvStore().apiUrl + "users/login/", {
          email: this.username,
          password: this.password,
        });
        console.log(login);
        this.decodejwt(login.data.access_token);
        useAuthStore().getToken(login.data.access_token);
        // this.aquireToken()
        this.loading = false;
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    decodejwt(acctoken) {
      const token = acctoken;
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        useAuthStore().login(decoded);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang=""></style>
