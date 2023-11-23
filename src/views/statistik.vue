<template lang="">
  <div class="w-full h-full">
    <div class="flex w-full h-[10%] mb-6 justify-center items-center bg-accent">
      <div class="text-base-100 text-4xl font-semibold">Statistik</div>
    </div>

    <div class="w-full h-full pr-6 pb-6">
      <div class="w-full h-max p-4 bg-slate-100 rounded-xl">
        <table class="table bg-base-100 rounded-none w-1/2 mx-auto">
          <thead>
            <tr>
              <td>User</td>
              <td>Jumlah Data</td>
            </tr>
          </thead>
          <tbody v-for="items in countUser" :key="items.index">
            <tr class="hover">
              <td class="capitalize">{{ items.user }}</td>
              <td>{{ items.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { useEnvStore } from "@/stores/envStore";
import { useAuthStore } from "@/stores/authStore";

import axios from "axios";
export default {
  data() {
    return {
      items: [],
      countUser: [],
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

        const result = this.items.reduce((acc, obj) => {
          const existingUser = acc.find((item) => item.user === obj.user);
          if (existingUser) {
            existingUser.count += 1;
          } else {
            acc.push({ user: obj.user, count: 1 });
          }
          return acc;
        }, []);
        this.countUser = result;
        console.log(this.countUser);
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
    this.getData();
  },
};
</script>
<style lang=""></style>
