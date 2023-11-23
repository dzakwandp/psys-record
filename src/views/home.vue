<template lang="">
  <div class="w-full h-full p-4">
    <div class="flex w-full h-[7%] items-center justify-between">
      <!-- search bar -->
      <div class="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-accent">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search here"
          class="input input-bordered input-sm input-accent w-full max-w-xs"
          v-model="searchValue" />
      </div>
      <button
        class="btn btn-outline btn-sm btn-accent"
        @click="this.$router.push('/new')">
        Tambah
      </button>
    </div>

    <!-- filter section -->
    <div class="flex w-full h-[7%] items-center justify-between">
      <div class="flex w-1/10">
        <v-select
          v-model="user"
          :options="userList"
          @update:modelValue="filterByUser(user)">
        </v-select>
      </div>
      <div class="flex w-1/10">
        <download-excel :data="items">
          <button class="text-accent">
            <DocumentIcon></DocumentIcon>
          </button>
        </download-excel>
      </div>
    </div>

    <!-- table section -->
    <EasyDataTable
      v-model:items-selected="itemsSelected"
      :headers="headers"
      :items="reversedData"
      :search-field="searchField"
      :search-value="searchValue"
      @click-row="toDataDetail"
      alternating>
      <template #item-alamat="item">
        <div>
          {{ mergedAlamat(item) }}
        </div>
      </template>
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
// import { FilterOption } from "vue3-easy-data-table";
import DocumentIcon from "@/components/icons/document_icon.vue";

import moment from "moment/min/moment-with-locales";
import axios from "axios";
export default {
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
    DocumentIcon,
  },
  data() {
    return {
      itemsSelected: null,
      name: null,
      country: null,
      searchField: [
        "name",
        "kelamin",
        "nik",
        "hp",
        "alamat",
        "kelurahan",
        "kecamatan",
        "kota",
        "provinsi",
        "caleg",
        "kegiatan",
        "user",
      ],
      searchValue: "",
      headers: [
        { text: "NAMA", value: "name" },
        { text: "JENIS KELAMIN", value: "kelamin" },
        { text: "NIK", value: "nik" },
        { text: "NO. HANDPHONE", value: "hp" },
        { text: "ALAMAT", value: "alamat", width: 300 },
        { text: "CALEG", value: "caleg" },
        { text: "KEGIATAN", value: "kegiatan" },
        { text: "DATA OLEH", value: "user" },
        { text: "DATA DIBUAT", value: "created_date" },
      ],
      user: "Filter by User",
      userList: ["Vita", "Anisa", "Chika", "Amanda", "Fara", "Ririk", "Ulfi"],
      items: [],
      defaultItems: [],
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
        this.defaultItems = data.data.data;
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
    filterByUser(value) {
      if (value === null) {
        this.items = this.defaultItems;
        this.user = "Filter by User";
      } else {
        const filterArray = this.defaultItems.filter(
          (obj) => obj.user === value.toLowerCase()
        );
        this.items = filterArray;
        console.log(this.items);
      }
    },
    toDataDetail(item) {
      // console.log(item)
      this.$router.push("/detail/" + item.id);
    },
    formattedDate(value) {
      // const date = moment(value).subtract(7, "hours");
      moment.locale("id");
      return moment(value).format("D MMMM YYYY");
    },
    mergedAlamat(data) {
      const alamat =
        data.alamat +
        ", " +
        data.kelurahan +
        ", " +
        data.kecamatan +
        ", " +
        data.kota +
        ", " +
        data.provinsi +
        ", " +
        data.kodePos;
      return alamat;
      console.log(alamat);
    },
  },
  computed: {
    reversedData() {
      return this.items.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_date) - new Date(a.created_date);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
>>> {
  --vs-border-color: #1dcdbc;
  --vs-border-radius: 6px;
}
</style>
