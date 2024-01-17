<template lang="">
  <div class="w-full h-full p-4">
    <div class="flex w-full h-[7%] items-center">
      <div class="flex w-1/2 h-full gap-4 items-center">
        <!-- search bar -->
        <div class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-accent"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search here"
            class="input input-bordered input-sm input-accent w-full max-w-xs"
            v-model="searchValue"
          />
        </div>
        <!-- show/hide filter button -->
        <button
          class="btn btn-accent btn-outline btn-sm"
          @click="showFilter = !showFilter"
        >
          <p v-if="showFilter">Sembunyikan Filter</p>
          <p v-else>Tampilkan Filter</p>
        </button>
        <!-- export button -->
        <download-excel :fields="export_fields" :data="items">
          <button class="text-accent align-middle" title="Export to .xls">
            <DocumentIcon></DocumentIcon>
          </button>
        </download-excel>
      </div>
      <!-- tambah button -->
      <div class="flex w-1/2 justify-end">
        <button
          class="btn btn-outline btn-sm btn-accent"
          @click="this.$router.push('/new')"
        >
          Tambah
        </button>
      </div>
    </div>

    <!-- filter section -->
    <div v-if="showFilter" class="flex-col w-full">
      <!-- first row -->
      <div class="flex w-full h-[7%] items-center justify-between mb-4">
        <!-- filter by provinsi -->
        <div class="flex w-1/10">
          <v-select
            v-model="prov"
            :options="provList"
            @update:modelValue="filterByProv(prov)"
          >
          </v-select>
        </div>
        <!-- filter by kota -->
        <div class="flex w-1/10">
          <v-select
            v-model="kota"
            :options="kotaList"
            @update:modelValue="filterByKota(kota)"
          >
          </v-select>
        </div>
        <!-- filter by kecamatan -->
        <div class="flex w-1/10">
          <v-select
            v-model="kecamatan"
            :options="kecamatanList"
            @update:modelValue="filterByKecamatan(kecamatan)"
          >
          </v-select>
        </div>
        <!-- filter by kelurahan -->
        <div class="flex w-1/10">
          <v-select
            v-model="kelurahan"
            :options="kelurahanList"
            @update:modelValue="filterByKelurahan(kelurahan)"
          >
          </v-select>
        </div>
        <!-- filter by kodepos -->
        <div class="flex w-1/10">
          <v-select
            v-model="kodepos"
            :options="kodeposList"
            @update:modelValue="filterByKodePos(kodepos)"
          >
          </v-select>
        </div>
        <!-- filter by RW -->
        <div class="flex w-1/10">
          <v-select
            v-model="rw"
            :options="rwList"
            @update:modelValue="filterByKodeRW(rw)"
          >
          </v-select>
        </div>
        <!-- filter by RT -->
        <div class="flex w-1/10">
          <v-select
            v-model="rt"
            :options="rtList"
            @update:modelValue="filterByKodeRT(rt)"
          >
          </v-select>
        </div>
      </div>
      <!-- second row -->
      <div class="flex w-full h-[7%] items-center justify-center mb-4 gap-10">
        <!-- filter by JK -->
        <div class="flex w-1/10">
          <v-select
            v-model="jk"
            :options="jkList"
            @update:modelValue="filterByJK(jk)"
          >
          </v-select>
        </div>
        <!-- filter by caleg -->
        <div class="flex w-1/10">
          <v-select
            v-model="caleg"
            :options="calegList"
            @update:modelValue="filterByCaleg(caleg)"
          >
          </v-select>
        </div>
        <!-- filter by user -->
        <div class="flex w-1/10">
          <v-select
            v-model="user"
            :options="userList"
            @update:modelValue="filterByUser(user)"
          >
          </v-select>
        </div>
      </div>
      <!-- third row -->
      <div class="flex w-full h-[7%] items-center justify-center mb-4 gap-2">
        <!-- reset filter -->
        <div class="flex w-1/10">
          <button
            class="btn btn-outline btn-accent btn-sm"
            @click="resetFilter()"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>

    <!-- table section -->
    <EasyDataTable
      v-model:items-selected="itemsSelected"
      :headers="headers"
      :items="reversedData"
      :loading="loading"
      :theme-color="theme"
      :search-field="searchField"
      :search-value="searchValue"
      @click-row="toDataDetail"
      alternating
    >
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
      showFilter: false,
      loading: true,
      theme: "#37cdbe",
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
      prov: "Filter Provinsi",
      provList: [],
      kota: "Filter Kota/Kab",
      kotaList: [],
      kecamatan: "Filter Kecamatan",
      kecamatanList: [],
      kelurahan: "Filter Kelurahan",
      kelurahanList: [],
      kodepos: "Filter Kode Pos",
      kodeposList: [],
      rt: "Filter RT",
      rtList: [],
      rw: "Filter RW",
      rwList: [],
      user: "Filter User",
      userList: ["Vita", "Anisa", "Chika", "Amanda", "Fara", "Ririk", "Ulfi"],
      jk: "Filter Jenis Kelamin",
      jkList: ["LakiLaki", "Perempuan"],
      caleg: "Filter Caleg",
      calegList: [],
      items: [],
      defaultItems: [],
      export_fields: {
        Nama: "name",
        "Jenis Kelamin": "kelamin",
        NIK: {
          field: "nik",
          callback: (value) => {
            return value.toString();
          },
        },
        HP: {
          field: "hp",
          callback: (value) => {
            return "'"+value;
          },
        },
        Provinsi: "provinsi",
        "Kabupaten/ Kota": "kota",
        Kecamatan: "kecamatan",
        Kelurahan: "kelurahan",
        Alamat: "alamat",
        "Kode Pos": "kodePos",
        RT: "rt",
        RW: "rw",
        Caleg: "caleg",
        Kegiatan: {
          field: "kegiatan",
          callback: (value) => {
            return value.map((a) => a.kegiatan.name);
          },
        },
        data_oleh: "user",
        created_at: "created_date"
      },
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
        this.items = data.data.data;
        this.defaultItems = data.data.data;
        this.getProvList();
        this.getCaleg();
        this.loading = false;
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
    getProvList() {
      this.provList = [
        ...new Set(this.items.map((item) => item.provinsi)),
      ].sort();
      console.log(this.provList);
    },
    getCaleg() {
      this.calegList = [
        ...new Set(this.items.map((item) => item.caleg)),
      ].sort();
    },
    resetFilter() {
      this.items = this.defaultItems;
      this.provinsi = "Filter Provinsi";
      this.kota = "Filter Kota/Kab";
      this.kecamatan = "Filter Kecamatan";
      this.kelurahan = "Filter Kelurahan";
      this.kodepos = "Filter Kode Pos";
      this.rt = "Filter RT";
      this.rw = "Filter RW";
      this.jk = "Filter Jenis Kelamin";
      this.user = "Filter User";
      this.caleg = "Filter Caleg";
    },
    filterByProv(value) {
      if (value === null) {
        this.prov = "Filter Prov";
      } else {
        var filterArray = this.items.filter((obj) => obj.provinsi === value);
        this.items = filterArray;
        this.kotaList = [
          ...new Set(this.items.map((item) => item.kota)),
        ].sort();
      }
    },
    filterByKota(value) {
      if (value === null) {
        this.kota = "Filter Kota/Kab";
      } else {
        var filterArray = this.items.filter((obj) => obj.kota === value);
        this.items = filterArray;
        this.kecamatanList = [
          ...new Set(this.items.map((item) => item.kecamatan)),
        ].sort();
      }
    },
    filterByKecamatan(value) {
      if (value === null) {
        this.kecamatan = "Filter Kecamatan";
      } else {
        var filterArray = this.items.filter((obj) => obj.kecamatan === value);
        this.items = filterArray;
        this.kelurahanList = [
          ...new Set(this.items.map((item) => item.kelurahan)),
        ].sort();
      }
    },
    filterByKelurahan(value) {
      if (value === null) {
        this.kelurahan = "Filter Kelurahan";
      } else {
        var filterArray = this.items.filter((obj) => obj.kelurahan === value);
        this.items = filterArray;
        this.kodeposList = [
          ...new Set(this.items.map((item) => item.kodePos)),
        ].sort();
        this.rtList = [...new Set(this.items.map((item) => item.rt))].sort();
        this.rwList = [...new Set(this.items.map((item) => item.rw))].sort();
      }
    },
    filterByKodePos(value) {
      if (value === null) {
        this.kodepos = "Filter Kode Pos";
      } else {
        var filterArray = this.items.filter((obj) => obj.kodePos === value);
        this.items = filterArray;
      }
    },
    filterByKodeRW(value) {
      if (value === null) {
        this.rw = "Filter RW";
      } else {
        var filterArray = this.items.filter((obj) => obj.rw === value);
        this.items = filterArray;
      }
    },
    filterByKodeRT(value) {
      if (value === null) {
        this.rt = "Filter RT";
      } else {
        var filterArray = this.items.filter((obj) => obj.rt === value);
        this.items = filterArray;
      }
    },
    filterByJK(value) {
      if (value === null) {
        this.jk = "Filter Jenis Kelamin";
      } else {
        var filterArray = this.items.filter((obj) => obj.kelamin === value);
        this.items = filterArray;
      }
    },
    filterByUser(value) {
      if (value === null) {
        this.user = "Filter User";
      } else {
        var filterArray = this.items.filter(
          (obj) => obj.user === value.toLowerCase()
        );
        this.items = filterArray;
      }
    },
    filterByCaleg(value) {
      if (value === null) {
        this.caleg = "Filter Caleg";
      } else {
        var filterArray = this.items.filter((obj) => obj.caleg === value);
        this.items = filterArray;
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
  --vs-dropdown-min-width: 330px;
}
</style>
