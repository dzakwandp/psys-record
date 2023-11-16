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
        onclick="event_modal.showModal()">
        Tambah
      </button>
      <dialog id="event_modal" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 class="font-bold text-lg">Masukkan Nama Kegiatan</h3>
          <input
            type="text"
            class="input input-bordered input-accent w-full mt-4"
            v-model="event" />
          <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-accent text-base-100" @click="addEvent()">
              Tambah
            </button>
          </div>
        </div>
      </dialog>
    </div>
    <EasyDataTable :headers="headers" :items="items" alternating/>
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
      event: null,
      headers: [{ text: "KEGIATAN", value: "name" }],
      items: [],
    };
  },
  methods: {
    async getEvent() {
      try {
        const event = await axios.get(
          useEnvStore().apiUrl + "kegiatan_master",
          {
            headers: {
              Authorization: "Bearer " + useAuthStore().accessToken,
            },
          }
        );
        console.log(event);
        this.items = event.data.data;
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
    async addEvent() {
      try {
        const add = await axios.post(
          useEnvStore().apiUrl + "kegiatan_master",
          {
            name: this.event,
          },
          {
            headers: {
              Authorization: "Bearer " + useAuthStore().accessToken,
            },
          }
        );
        document.getElementById("event_modal").close();
        this.getEvent();
        this.event = null;
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
    this.getEvent();
  },
};
</script>
<style lang=""></style>
