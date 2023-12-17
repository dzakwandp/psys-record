<template lang="">
  <div v-if="loading" class="flex w-full h-full items-center justify-center">
    <span class="loading loading-dots w-[5rem] text-accent"></span>
  </div>
  <div v-else class="w-full h-full">
    <div class="flex w-full h-[10%] justify-center items-center bg-accent">
      <div class="text-base-100 text-4xl font-semibold">Edit Data</div>
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
        disabled
        class="input input-bordered input-accent input-sm text-base"
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

      <div>
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

      <div>
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

      <div>
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

      <div>
        <label class="flex text-base"
          >Kode Pos:
          <div class="text-red-500">*</div>
        </label>
        <v-select
          v-model="kode_pos"
          :options="postalCodeList"
          label="postal_code">
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
        <!-- <label class="text-base">Kegiatan: </label>
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
          v-model="catatan_kegiatan"></textarea> -->
        <!-- <button
          v-if="showAddKegiatanButton"
          class="btn btn-accent btn-sm text-base-100"
          @click="tambahItem()">
          Tambah
        </button> -->
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
                <button class="text-warning" @click="editCatatanKegiatan(items)">
                  <editIcon />
                </button>
                <!-- <button class="text-error" @click="hapusItem(items.index)">
                  <deleteIcon />
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <editModal ref="editModal" />

      <label class="text-base">Catatan: </label>
      <textarea
        class="textarea textarea-bordered textarea-accent text-base mb-4 w-full"
        placeholder="Catatan"
        v-model="catatan"></textarea>

      <button class="btn btn-neutral text-base-100 mb-4" @click="submitData()">
        Update Data
      </button>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/authStore";
import { useEnvStore } from "@/stores/envStore";

import editModal from "@/components/editKegiatan.vue";
import deleteIcon from "@/components/icons/delete_icon.vue";
import editIcon from "@/components/icons/edit_icon.vue";
import axios from "axios";
export default {
  components: { deleteIcon, editIcon, editModal },
  data() {
    return {
      loading: true,
      name: null,
      kelamin: "",
      nik: "",
      hp: "",
      alamat: null,
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
      kelurahanId: null,
      kecamatan: "Pilih Kecamatan",
      kecamatanId: null,
      kota: "Pilih Kota",
      kotaId: null,
      provinsi: "Pilih Provinsi",
      provinsiId: null,
      kode_pos: null,
      kelurahanList: [],
      kecamatanList: [],
      kotaList: [],
      provinsiList: [],
      postalCodeList: [],
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
      this.provinsiId = this.provinsi.id;
      this.provinsi = this.provinsi.name;
      axios
        .get(
          useEnvStore().addressUrl + "regencies/" + this.provinsiId + ".json"
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
      this.kotaId = this.kota.id;
      this.kota = this.kota.name;
      axios
        .get(useEnvStore().addressUrl + "districts/" + this.kotaId + ".json")
        .then((res) => {
          this.kecamatanList = res.data;
          this.showKecamatan = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVillageData() {
      this.kecamatanId = this.kecamatan.id;
      this.kecamatan = this.kecamatan.name;
      axios
        .get(
          useEnvStore().addressUrl + "villages/" + this.kecamatanId + ".json"
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
      this.kelurahanId = this.kelurahan.id;
      this.kelurahan = this.kelurahan.name;
      const strKab = this.kota.substr(this.kota.indexOf(" ") + 1);
      axios
        .get(
          "http://178.16.143.152:3005/kodepos/" +
            this.provinsiId +
            "?" +
            "q=" +
            this.kelurahan +
            "-" +
            this.kecamatan +
            "-" +
            strKab
        )
        .then((res) => {
          this.postalCodeList = new Array(res.data.data);
          console.log(this.postalCodeList);
          this.kode_pos = this.postalCodeList[0].postal_code;
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
    async getData() {
      try {
        const getData = await axios.get(
          useEnvStore().apiUrl + "post/" + this.$route.params.id,
          {
            headers: {
              Authorization: "Bearer " + useAuthStore().accessToken,
            },
          }
        );
        console.log(getData);
        this.nik = getData.data.data.nik;
        this.name = getData.data.data.name;
        this.kelamin = getData.data.data.kelamin;
        this.hp = getData.data.data.hp;
        this.provinsi = getData.data.data.provinsi;
        this.kota = getData.data.data.kota;
        this.kecamatan = getData.data.data.kecamatan;
        this.kelurahan = getData.data.data.kelurahan;
        this.kode_pos = getData.data.data.kodePos;
        this.alamat = getData.data.data.alamat;
        this.rt = getData.data.data.rt;
        this.rw = getData.data.data.rw;
        this.caleg = getData.data.data.caleg;
        this.catatan = getData.data.data.catatan;
        this.kegiatanShow = getData.data.data.kegiatan.map((item) => ({
          id: item.id,
          post_id: item.post_id,
          kegiatan_id: item.kegiatan_id,
          kegiatan_name: item.kegiatan.name,
          catatan_kegiatan: item.catatan_kegiatan,
        }));
        console.log(this.kegiatanShow);
      } catch (err) {
        console.log(err);
      }
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
    editCatatanKegiatan(item) {
      this.$refs.editModal.openModal(item);
    },
    async submitData() {
      this.kegiatan = this.kegiatanShow.map((item) => ({
        id: item.id,
        post_id: item.post_id,
        kegiatan_id: item.kegiatan_id,
        catatan_kegiatan: item.catatan_kegiatan,
      }));
      try {
        const submit = await axios.put(
          useEnvStore().apiUrl + "post/" + this.$route.params.id,
          {
            name: this.name,
            kelamin: this.kelamin,
            nik: String(this.nik),
            hp: this.hp,
            provinsi: this.provinsi,
            kota: this.kota,
            kecamatan: this.kecamatan,
            kelurahan: this.kelurahan,
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
        console.log(submit);
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
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
  },
  mounted() {
    this.getData();
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
