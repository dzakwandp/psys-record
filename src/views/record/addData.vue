<template lang="">
  <div v-if="loading" class="flex w-full h-full items-center justify-center">
    <span class="loading loading-dots w-[5rem] text-accent"></span>
  </div>
  <div v-else class="w-full h-full">
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
      <div class="flex gap-1 mb-4">
        <div class="text-red-500">*</div>
        <div class="italic">) Wajib diisi.</div>
      </div>
      <label class="flex text-base"
        >NIK:
        <div class="text-red-500">*</div>
      </label>
      <input
        type="number"
        placeholder="Masukkan NIK"
        class="input input-bordered input-accent input-sm text-base"
        v-model="nik" />
      <span :class="nikVerifMessageClass">{{ nikVerifMessage }}</span>
      <button
        class="btn btn-accent btn-sm text-base-100 mb-4 mt-2"
        @click="verifNik()">
        Check NIK
      </button>

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

      <div class="flex justify-between mb-4">
        <div class="flex flex-col w-2/5">
          <label class="text-base">RT: </label>
          <input
            type="text"
            placeholder="2 digit angka (01)"
            class="input input-bordered input-accent input-sm text-base mb-1"
            v-model="rt" />
          <span class="text-error text-xs">Wajib diisi dengan 2 digit.</span>
        </div>
        <div class="flex flex-col w-2/5">
          <label class="text-base">RW: </label>
          <input
            type="text"
            placeholder="2 digit angka (01)"
            class="input input-bordered input-accent input-sm text-base mb-1"
            v-model="rw" />
          <span class="text-error text-xs">Wajib diisi dengan 2 digit.</span>
        </div>
      </div>

      <label class="flex text-base"
        >Caleg:
        <div class="text-red-500">*</div>
      </label>
      <v-select v-model="caleg" :options="calegList" label="name"> </v-select>

      <div class="flex flex-col outline outline-accent p-2 my-4">
        <label class="text-base">Kegiatan: </label>
        <v-select
          v-model="event"
          :options="eventList"
          @update:modelValue="showAddKegiatanButton = true"
          label="name">
        </v-select>
        <label class="text-base">Catatan Kegiatan: </label>
        <textarea
          class="textarea textarea-bordered textarea-accent text-base mb-4 w-full"
          placeholder="Catatan Kegiatan"
          v-model="catatan_kegiatan"></textarea>
        <button
          v-if="showAddKegiatanButton"
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
              <td>
                <button class="text-error" @click="hapusItem(items.index)">
                  <deleteIcon />
                </button>
              </td>
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

import deleteIcon from "@/components/icons/delete_icon.vue";
import axios from "axios";
export default {
  components: { deleteIcon },
  data() {
    return {
      loading: true,
      name: "",
      kelamin: "",
      nik: "",
      hp: "",
      alamat: "",
      rt: "00",
      rw: "00",
      catatan: "",
      caleg: "Pilih Caleg",
      calegList: [],
      event: "",
      eventList: [],
      catatan_kegiatan: "",
      kegiatan: [],
      kegiatanShow: [],
      showAddKegiatanButton: false,
      kelurahan: "Pilih Kelurahan",
      kecamatan: "Pilih Kecamatan",
      kota: "Pilih Kota",
      provinsi: "Pilih Provinsi",
      kode_pos: null,
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
      nikVerifMessage: "",
      nikVerifMessageClass: "",
    };
  },
  methods: {
    getProvinceData() {
      axios
        .get(useEnvStore().addressUrl + "provinces.json")
        .then((res) => {
          this.provinsiList = res.data.filter(
            (item) => item.name === "JAWA TENGAH"
          );
          console.log(this.provinsiList);
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
          const desiredCity = [
            "KOTA SEMARANG",
            "KABUPATEN SEMARANG",
            "KOTA SALATIGA",
            "KABUPATEN KENDAL",
          ];
          this.kotaList = res.data.filter((item) =>
            desiredCity.includes(item.name)
          );
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
            this.kelurahan.name +
            "+" +
            strKab
        )
        .then((res) => {
          this.postalCodeList = res.data.data;
          console.log(this.postalCodeList);
          this.kode_pos = this.postalCodeList[0].code;
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
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 403) {
            useAuthStore().logout();
            this.$router.push("/login");
          }
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
          this.eventList = res.data.data;
          console.log(this.eventList);
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
      console.log(Object.keys(this.kegiatanShow));
    },
    hapusItem(index) {
      const indexToRemove = index;
      const removedIndex = this.kegiatanShow.filter(
        (obj) => obj.index !== indexToRemove
      );
      this.kegiatanShow = removedIndex;
      console.log(Object.keys(this.kegiatanShow));
      if (Object.keys(this.kegiatanShow).length !== 0) {
        this.showAddKegiatanButton = true;
      } else {
        this.showAddKegiatanButton = false;
      }
    },
    async submitData() {
      try {
        const submit = await axios.post(
          useEnvStore().apiUrl + "post",
          {
            name: this.name,
            kelamin: this.kelamin,
            nik: String(this.nik),
            hp: this.hp,
            provinsi: this.provinsi.name,
            kota: this.kota.name,
            kecamatan: this.kecamatan.name,
            kelurahan: this.kelurahan.name,
            kodePos: this.kode_pos,
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
        if (err.response.status === 400) {
          this.$swal.fire({
            icon: "error",
            title: "Error!",
            text: "Periksa kembali form Anda, pastikan kolom wajib terisi sudah diisi.",
          });
        }
      }
    },
    async verifNik() {
      if (String(this.nik).length === 16) {
        try {
          const verif = await axios.post(
            useEnvStore().apiUrl + "nik",
            {
              nik: String(this.nik),
            },
            {
              headers: {
                Authorization: "Bearer " + useAuthStore().accessToken,
              },
            }
          );
          this.nikVerifMessage = verif.data.message;
          this.nikVerifMessageClass = "text-accent";
        } catch (err) {
          this.nikVerifMessage = err.response.data.message;
          this.nikVerifMessageClass = "text-error";
        }
      } else {
        this.$swal.fire({
          icon: "error",
          title: "NIK harus terdiri dari 16 digit.",
        });
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
