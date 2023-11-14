<template lang="">
  <div class="w-full h-full">
    <div class="flex w-full h-[10%] justify-center items-center bg-accent">
      <div class="text-base-100 text-4xl font-semibold">Tambah Data</div>
    </div>
    <button
      class="btn btn-ghost text-neutral"
      @click="this.$router.push('/home')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </svg>
      Kembali
    </button>
    <div class="flex flex-col w-1/4 mx-auto mt-4">
      <label class="flex text-base"
        >NIK:
        <div class="text-red-500">*</div>
      </label>
      <input
        type="text"
        placeholder="Masukkan NIK"
        class="input input-bordered input-accent input-sm text-base mb-4"
        v-model="nik" />

      <label class="flex text-base"
        >Nama:
        <div class="text-red-500">*</div>
      </label>
      <input
        type="text"
        placeholder="Masukkan Nama"
        class="input input-bordered input-accent input-sm text-base mb-4"
        v-model="name" />

      <div class="flex flex-col mb-4">
        <label class="flex text-base"
          >Jenis Kelamin:
          <div class="text-red-500">*</div>
        </label>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            id="lakilaki"
            value="LakiLaki"
            v-model="kelamin"
            class="radio radio-accent mr-2" />
          <label for="one">Laki-Laki</label>
        </div>

        <div class="flex items-center">
          <input
            type="radio"
            id="perempuan"
            value="Perempuan"
            v-model="kelamin"
            class="radio radio-accent mr-2" />
          <label for="two">Perempuan</label>
        </div>
      </div>

      <label class="text-base">No. Handphone: </label>
      <input
        type="text"
        placeholder="Masukkan No. Handphone"
        class="input input-bordered input-accent input-sm text-base mb-4"
        v-model="hp" />

      <label class="flex text-base"
        >Provinsi:
        <div class="text-red-500">*</div>
      </label>
      <v-select
        v-model="provinsi"
        :options="provinsiList"
        label="name"
        @update:modelValue="getCityData()">
      </v-select>

      <div v-if="showKota">
        <label class="flex text-base"
          >Kota/ Kabupaten:
          <div class="text-red-500">*</div>
        </label>
        <v-select
          v-model="kota"
          :options="kotaList"
          label="name"
          @update:modelValue="getDistrictData()">
        </v-select>
      </div>

      <div v-if="showKecamatan">
        <label class="flex text-base"
          >Kecamatan:
          <div class="text-red-500">*</div>
        </label>
        <v-select
          v-model="kecamatan"
          :options="kecamatanList"
          label="name"
          @update:modelValue="getVillageData()">
        </v-select>
      </div>

      <div v-if="showKelurahan">
        <label class="flex text-base"
          >Kelurahan:
          <div class="text-red-500">*</div>
        </label>
        <v-select
          v-model="kelurahan"
          :options="kelurahanList"
          label="name"
          @update:modelValue="getPostalCodeData()">
        </v-select>
      </div>

      <div v-if="showPostalCode">
        <label class="flex text-base"
          >Kode Pos:
          <div class="text-red-500">*</div>
        </label>
        <v-select v-model="kode_pos" :options="postalCodeFilter" label="code">
        </v-select>
      </div>

      <label class="flex text-base"
        >Alamat:
        <div class="text-red-500">*</div>
      </label>
      <textarea
        class="textarea textarea-bordered textarea-accent text-base mb-4 w-full"
        placeholder="Masukkan alamat"
        v-model="alamat"></textarea>

      <div class="flex justify-between">
        <div class="flex flex-col w-2/5">
          <label class="text-base">RT: </label>
          <input
            type="text"
            placeholder="2 digit angka (01)"
            class="input input-bordered input-accent input-sm text-base mb-4"
            v-model="rt" />
        </div>
        <div class="flex flex-col w-2/5">
          <label class="text-base">RW: </label>
          <input
            type="text"
            placeholder="2 digit angka (01)"
            class="input input-bordered input-accent input-sm text-base mb-4"
            v-model="rw" />
        </div>
      </div>

      <label class="flex text-base"
        >Caleg:
        <div class="text-red-500">*</div>
      </label>
      <v-select v-model="caleg" :options="calegList" label="name"> </v-select>

      <div class="flex flex-col outline outline-accent p-2 my-4">
        <label class="text-base">Kegiatan: </label>
        <v-select v-model="event" :options="evenList" label="name"> </v-select>
        <label class="text-base">Catatan Kegiatan: </label>
        <textarea
          class="textarea textarea-bordered textarea-accent text-base mb-4 w-full"
          placeholder="Catatan Kegiatan"
          v-model="catatan_kegiatan"></textarea>
        <button
          class="btn btn-accent btn-sm text-base-100"
          @click="tambahItem()">
          Tambah
        </button>
        <table class="table">
          <thead>
            <tr>
              <th>Kegiatan</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in kegiatanShow" :key="items.index">
              <td>{{ items.kegiatan_name }}</td>
              <td>{{ items.catatan_kegiatan }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <label class="text-base">Catatan: </label>
      <textarea
        class="textarea textarea-bordered textarea-accent text-base mb-4 w-full"
        placeholder="Catatan"
        v-model="catatan"></textarea>

      <button class="btn btn-neutral text-base-100 mb-4" @click="submitData()">
        Kirim Data
      </button>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/authStore";
import { useEnvStore } from "@/stores/envStore";

import axios from "axios";
export default {
  data() {
    return {
      name: "",
      kelamin: "",
      nik: "",
      hp: "",
      alamat: "",
      rt: "",
      rw: "",
      catatan: "",
      caleg: "Pilih Caleg",
      calegList: [],
      event: "",
      evenList: [],
      catatan_kegiatan: "",
      kegiatan: [],
      kegiatanShow: [],
      kelurahan: "Pilih Kelurahan",
      kecamatan: "Pilih Kecamatan",
      kota: "Pilih Kota",
      provinsi: "Pilih Provinsi",
      kode_pos: "Pilih Kode Pos",
      kelurahanList: [],
      kecamatanList: [],
      kotaList: [],
      provinsiList: [],
      postalCodeList: [],
      showKota: false,
      showKecamatan: false,
      showKelurahan: false,
      showPostalCode: false,
      postalCodeFilter: {},
    };
  },
  methods: {
    getProvinceData() {
      axios
        .get(useEnvStore().addressUrl + "provinces.json")
        .then((res) => {
          this.provinsiList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCityData() {
      axios
        .get(
          useEnvStore().addressUrl + "regencies/" + this.provinsi.id + ".json"
        )
        .then((res) => {
          this.kotaList = res.data;
          this.showKota = true;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDistrictData() {
      axios
        .get(useEnvStore().addressUrl + "districts/" + this.kota.id + ".json")
        .then((res) => {
          this.kecamatanList = res.data;
          this.showKecamatan = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVillageData() {
      axios
        .get(
          useEnvStore().addressUrl + "villages/" + this.kecamatan.id + ".json"
        )
        .then((res) => {
          this.kelurahanList = res.data;
          this.showKelurahan = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPostalCodeData() {
      const strKab = this.kota.name.substr(this.kota.name.indexOf(" ") + 1);
      axios
        .get(
          "https://kodepos.vercel.app/search/?q=" +
            this.kecamatan.name +
            "+" +
            strKab
        )
        .then((res) => {
          this.postalCodeList = res.data.data;
          console.log(this.postalCodeList);
          this.showPostalCode = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCaleg() {
      axios
        .get(useEnvStore().apiUrl + "caleg", {
          headers: {
            Authorization: "Bearer " + useAuthStore().accessToken,
          },
        })
        .then((res) => {
          this.calegList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEvent() {
      axios
        .get(useEnvStore().apiUrl + "kegiatan_master", {
          headers: {
            Authorization: "Bearer " + useAuthStore().accessToken,
          },
        })
        .then((res) => {
          this.evenList = res.data.data;
          console.log(this.evenList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tambahItem() {
      const itemBaru = {
        kegiatan_name: this.event.name,
        kegiatan_id: this.event.id,
        catatan_kegiatan: this.catatan_kegiatan,
      };
      this.kegiatanShow.push(itemBaru);
      const createIndex = this.kegiatanShow.map((obj, index) => ({
        ...obj,
        index: index + 1,
      }));
      this.kegiatanShow = createIndex;
      this.event = "";
      this.catatan_kegiatan = "";
      console.log(this.kegiatanShow);

      const kegiatan = this.kegiatanShow.map((obj) => {
        const { kegiatan_name, index, ...rest } = obj;
        return rest;
      });
      this.kegiatan = kegiatan;
      console.log(this.kegiatan);
    },
    async submitData() {
      try {
        const submit = await axios.post(
          useEnvStore().apiUrl + "post",
          {
            name: this.name,
            kelamin: this.kelamin,
            nik: this.nik,
            hp: this.hp,
            provinsi: this.provinsi.name,
            kota: this.kota.name,
            kecamatan: this.kecamatan.name,
            kelurahan: this.kelurahan.name,
            kodePos: this.kode_pos.code,
            alamat: this.alamat,
            rt: this.rt,
            rw: this.rw,
            caleg: this.caleg.name,
            kegiatan: this.kegiatan,
            catatan: this.catatan,
          },
          {
            headers: {
              Authorization: "Bearer " + useAuthStore().accessToken,
            },
          }
        );
        this.$router.push("/home");
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    postalCodeFilter() {
      return [...new Set(this.postalCodeList.map((i) => i.postalcode))].sort();
    },
  },
  mounted() {
    this.getProvinceData();
    this.getCaleg();
    this.getEvent();
  },
};
</script>
<style scoped>
>>> {
  --vs-border-color: #1dcdbc;
  --vs-border-radius: 6px;
  --vs-font-size: 1rem;
}
</style>
