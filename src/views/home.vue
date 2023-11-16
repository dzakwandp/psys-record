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
    <EasyDataTable
      v-model:items-selected="itemsSelected"
      :headers="headers"
      :items="items"
      @click-row="toDataDetail"
      alternating>
      <template #item-kegiatan="item">
        <div v-for="keg in item.kegiatan" class="my-1">
          <div class="badge badge-accent badge-outline">
            {{ keg.kegiatan.name }}
          </div>
        </div>
      </template>
      <template #item-created_date="item">
        {{ formattedDate(item.created_date) }}
      </template>
    </EasyDataTable>
  </div>
</template>
<script>
import { useEnvStore } from "@/stores/envStore";
import { useAuthStore } from "@/stores/authStore";

import moment from "moment/min/moment-with-locales";
import axios from "axios";
export default {
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
  },
  data() {
    return {
      itemsSelected: null,
      name: null,
      country: null,
      headers: [
        { text: "NAMA", value: "name" },
        { text: "JENIS KELAMIN", value: "kelamin" },
        { text: "NIK", value: "nik" },
        { text: "NO. HANDPHONE", value: "hp" },
        { text: "ALAMAT", value: "alamat" },
        { text: "CALEG", value: "caleg" },
        { text: "KEGIATAN", value: "kegiatan" },
        { text: "DATA OLEH", value: "user" },
        { text: "DATA DIBUAT", value: "created_date" },
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
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
    toDataDetail(item) {
      // console.log(item)
      this.$router.push("/detail/" + item.id);
    },
    formattedDate(value) {
      const date = moment(value).subtract(7, "hours");
      moment.locale("id");
      return moment(date).format("D MMMM YYYY");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang=""></style>
