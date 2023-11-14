<template lang="">
  <div class="w-full h-full">
    <div class="flex w-full h-[10%] justify-center items-center bg-accent">
      <div class="text-base-100 text-4xl font-semibold">Tambah Data</div>
    </div>
    <div class="flex flex-col w-1/4 mx-auto mt-4">
      <label class="text-xl">Nama: </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-accent text-xl mb-4"
        v-model="name" />

      <div class="flex flex-col mb-4">
        <label class="text-xl mb-2">Jenis Kelamin: </label>
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

      <label class="text-xl">NIK: </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-accent text-xl mb-4"
        v-model="nik" />

      <label class="text-xl">No. Handphone: </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-accent text-xl mb-4"
        v-model="hp" />

      <label class="text-xl">Provinsi: </label>
      <select
        v-model="provinsi"
        class="select select-bordered select-accent text-xl mb-4"
        @change="getCityData()">
        <option disabled selected>Pilih Provinsi</option>
        <option
          v-for="prov in provinsiList"
          :key="prov.id"
          v-bind:value="{ name: prov.name, id: prov.id }">
          {{ prov.name }}
        </option>
      </select>

      <div v-if="showKota">
        <label class="text-xl">Kota/ Kabupaten: </label>
        <select
          v-model="kota"
          class="select select-bordered select-accent text-xl mb-4 w-full"
          @change="getDistrictData()">
          <option disabled selected>Pilih Kota/ Kabupaten</option>
          <option
            v-for="city in kotaList"
            :key="city.id"
            v-bind:value="{ name: city.name, id: city.id }">
            {{ city.name }}
          </option>
        </select>
      </div>

      <div v-if="showKecamatan">
        <label class="text-xl">Kecamatan: </label>
        <select
          v-model="kecamatan"
          class="select select-bordered select-accent text-xl mb-4 w-full"
          @change="getVillageData()">
          <option disabled selected>Pilih Kecamatan</option>
          <option
            v-for="kec in kecamatanList"
            :key="kec.id"
            v-bind:value="{ name: kec.name, id: kec.id }">
            {{ kec.name }}
          </option>
        </select>
      </div>

      <div v-if="showKelurahan">
        <label class="text-xl">Kelurahan: </label>
        <select
          v-model="kelurahan"
          class="select select-bordered select-accent text-xl mb-4 w-full"
          @change="getPostalCodeData()">
          <option disabled selected>Pilih Kelurahan</option>
          <option
            v-for="kel in kelurahanList"
            :key="kel.id"
            v-bind:value="{ name: kel.name, id: kel.id }">
            {{ kel.name }}
          </option>
        </select>
      </div>

      <div v-if="showPostalCode">
        <label class="text-xl">Kode Pos: </label>
        <select
          v-model="kode_pos"
          class="select select-bordered select-accent text-xl mb-4 w-full">
          <option disabled selected>Pilih Kode Pos</option>
          <option
            v-for="pos in postalCodeFilter"
            :key="pos.index"
            v-bind:value="{ code: pos }">
            {{ pos }}
          </option>
        </select>
      </div>

      <label class="text-xl">Alamat: </label>
      <textarea
        class="textarea textarea-bordered textarea-accent text-xl mb-4 w-full"
        placeholder="Alamat"
        v-model="alamat"></textarea>

      <div class="flex justify-between">
        <div class="w-2/5">
          <label class="text-xl">RT: </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-accent text-xl mb-4 w-full"
            v-model="rt" />
        </div>
        <div class="w-2/5">
          <label class="text-xl">RW: </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-accent text-xl mb-4 w-full"
            v-model="rw" />
        </div>
      </div>

      <label class="text-xl">Caleg: </label>
      <select
        v-model="caleg"
        class="select select-bordered select-accent text-xl mb-4 w-full">
        <option disabled selected>Pilih Caleg</option>
        <option
          v-for="caleg in calegList"
          :key="caleg.id"
          v-bind:value="{ name: caleg.name }">
          {{ caleg.name }}
        </option>
      </select>

      <div class="flex flex-col outline outline-accent p-2 mb-4">
        <label class="text-xl">Kegiatan: </label>
        <select
          v-model="event"
          class="select select-bordered select-accent text-xl mb-4 w-full">
          <option disabled selected>Pilih Kegiatan</option>
          <option
            v-for="event in evenList"
            :key="event.id"
            v-bind:value="{ id: event.id, name: event.name }">
            {{ event.name }}
          </option>
        </select>
        <label class="text-xl">Catatan Kegiatan: </label>
        <textarea
          class="textarea textarea-bordered textarea-accent text-xl mb-4 w-full"
          placeholder="Catatan Kegiatan"
          v-model="catatan_kegiatan"></textarea>
        <button class="btn btn-accent text-base-100" @click="tambahItem()">
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

      <label class="text-xl">Catatan: </label>
      <textarea
        class="textarea textarea-bordered textarea-accent text-xl mb-4 w-full"
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
      caleg: "",
      calegList: [],
      event: "",
      evenList: [],
      catatan_kegiatan: "",
      kegiatan: [],
      kegiatanShow: [],
      kelurahan: "",
      kecamatan: "",
      kota: "",
      provinsi: "Pilih Provinsi",
      kode_pos: "",
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
<style lang=""></style>
