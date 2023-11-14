<template lang="">
  <div class="w-full h-full p-4">
    <div class="flex w-full h-[10%] justify-between">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-sm input-accent w-full max-w-xs"
        v-model="name" />

      <!-- show modal -->
      <button
        class="btn btn-outline btn-sm btn-accent"
        onclick="caleg_modal.showModal()">
        Tambah
      </button>
      <dialog id="caleg_modal" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 class="font-bold text-lg">Masukkan Nama Caleg</h3>
          <input
            type="text"
            class="input input-bordered input-accent w-full mt-4"
            v-model="caleg" />
          <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-accent text-base-100" @click="addCalge()">
              Tambah
            </button>
          </div>
        </div>
      </dialog>
    </div>
    <EasyDataTable :headers="headers" :items="items" />
  </div>
</template>
<script>
import { useEnvStore } from "@/stores/envStore";
import { useAuthStore } from "@/stores/authStore";

import axios from "axios";
export default {
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
  },
  data() {
    return {
      caleg: null,
      headers: [{ text: "CALEG", value: "name" }],
      items: [],
    };
  },
  methods: {
    async getCaleg() {
      try {
        const caleg = await axios.get(useEnvStore().apiUrl + "caleg", {
          headers: {
            Authorization: "Bearer " + useAuthStore().accessToken,
          },
        });
        console.log(caleg);
        this.items = caleg.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addCalge() {
      try {
        const add = await axios.post(
          useEnvStore().apiUrl + "caleg",
          {
            name: this.caleg,
          },
          {
            headers: {
              Authorization: "Bearer " + useAuthStore().accessToken,
            },
          }
        );
        document.getElementById("caleg_modal").close();
        this.getCaleg();
        this.caleg = null;
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
  },
  mounted() {
    this.getCaleg();
  },
};
</script>
<style lang=""></style>
