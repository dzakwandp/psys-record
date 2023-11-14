<template lang="">
  <div class="w-full h-full p-4">
    <div class="flex w-full h-[10%] items-center justify-between">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-sm input-accent w-full max-w-xs"
        v-model="name" />
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-sm input-accent w-full max-w-xs"
        v-model="country" />
      <button
        class="btn btn-outline btn-sm btn-accent"
        @click="this.$router.push('/new')">
        Tambah
      </button>
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
      name: null,
      country: null,
      headers: [
        { text: "NAMA", value: "name" },
        { text: "JENIS KELAMIN", value: "kelamin" },
        { text: "NIK", value: "nik" },
        { text: "NO. HANDPHONE", value: "hp" },
        { text: "ALAMAT", value: "alamat" },
        { text: "CALEG", value: "caleg" },
        { text: "KEGIATAN", value: "kegiatan.catatan_kegiatan" },
        { text: "DATA OLEH", value: "user" },
      ],
      items: [],
    };
  },
  methods: {
    async getData() {
      try {
        const data = await axios.get(useEnvStore().apiUrl + "post", {
          headers: {
            Authorization: "Bearer " + useAuthStore().accessToken,
          },
        });
        console.log(data);
        this.items = data.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang=""></style>
