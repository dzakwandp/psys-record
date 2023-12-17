<template lang="">
  <div class="w-full h-full">
    <div class="flex w-full h-[10%] justify-center items-center bg-accent">
      <div class="text-base-100 text-4xl font-semibold">Detail Data</div>
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
    <div class="w-full h-full pr-6 pb-6">
      <div class="w-full h-max p-4 bg-slate-100 rounded-xl">
        <table class="table table-zebra bg-base-100 rounded-none w-1/2 mx-auto">
          <tbody>
            <tr>
              <td>NIK</td>
              <td>: {{ data.nik }}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>: {{ data.name }}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>: {{ data.kelamin }}</td>
            </tr>
            <tr>
              <td>No. Handphone</td>
              <td>: {{ data.hp }}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td class="capitalize">
                : {{ data.alamat }} RT {{ data.rt }} RW {{ data.rw }},
                {{ data.kelurahan }}, {{ data.kecamatan }}, {{ data.kota }},
                {{ data.provinsi }}, {{ data.kodePos }}
              </td>
            </tr>
            <tr>
              <td>Caleg</td>
              <td>: {{ data.caleg }}</td>
            </tr>
            <tr>
              <td>Kegiatan</td>
              <td>
                <table class="table">
                  <thead>
                    <th>Kegiatan</th>
                    <th>Catatan</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.kegiatan" :key="item.index">
                      <td>
                        <div class="badge badge-outline badge-accent">
                          {{ item.kegiatan.name }}
                        </div>
                      </td>
                      <td>{{ item.catatan_kegiatan }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Data Oleh</td>
              <td>: {{ data.user }}</td>
            </tr>
            <tr>
              <td>Data Dibuat</td>
              <td>: {{ formattedDate(data.created_date) }}</td>
            </tr>
            <tr>
              <td>Catatan</td>
              <td>: {{ data.catatan }}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex w-full justify-center gap-20 mt-4">
          <button
            class="btn btn-outline btn-warning w-20"
            @click="confirmAction('edit')">
            Edit
          </button>
          <button
            class="btn btn-outline btn-error w-20"
            @click="confirmAction('hapus')">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/authStore";
import { useEnvStore } from "@/stores/envStore";

import moment from "moment/min/moment-with-locales";
import axios from "axios";
export default {
  data() {
    return {
      id: null,
      data: [],
      Toast: this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      }),
    };
  },
  methods: {
    async getDetailData() {
      try {
        const detail = await axios.get(
          useEnvStore().apiUrl + "post/" + this.$route.params.id,
          {
            headers: {
              Authorization: "Bearer " + useAuthStore().accessToken,
            },
          }
        );
        console.log(detail);
        this.data = detail.data.data;
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          useAuthStore().logout();
          this.$router.push("/login");
        }
      }
    },
    confirmAction(value) {
      if (this.data.user === useAuthStore().email) {
        if (value === "hapus") {
          this.$swal
            .fire({
              text: "Apakah anda yakin akan menghapus data ini?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#FF5960",
              cancelButtonColor: "#00B5FF",
              confirmButtonText: "Ya, Saya yakin",
              cancelButtonText: "Tidak.",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$swal.showLoading();
                this.deleteData();
              }
            });
        }
        if (value === "edit") {
          this.$router.push("/edit/" + this.$route.params.id);
        }
      } else {
        this.Toast.fire({
          text: "Anda tidak diizinkan untuk melakukan hal ini.",
          icon: "error",
          iconColor: "#FAFAFA",
          color: "#FAFAFA",
          background: "#FF5960",
        });
      }
    },
    async deleteData() {
      try {
        const dataDel = await axios.delete(
          useEnvStore().apiUrl + "post/" + this.$route.params.id,
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
    formattedDate(value) {
      // const date = moment(value).subtract(7, "hours");
      moment.locale("id");
      return moment(value).format("D MMMM YYYY [Jam] HH:mm");
    },
  },
  mounted() {
    this.getDetailData();
    this.id = this.$route.params.id;
  },
};
</script>
<style lang=""></style>
