<template lang="">
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="flex drawer-content">
      <!-- Page content here -->

      <!-- toggle button -->
      <div class="h-screen mr-4">
        <label for="my-drawer" class="btn btn-ghost drawer-button"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </label>
      </div>

      <!-- router view -->
      <div class="w-full h-full">
        <router-view />
      </div>
    </div>
    <div class="drawer-side z-10">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"></label>
      <ul class="menu p-0 w-80 h-full bg-neutral text-base-100">
        <!-- Sidebar content here -->
        <div
          class="flex w-full bg-accent h-[80px] items-center justify-center mb-10">
          <div class="text-base-100 font-semibold text-xl">
            PSYS RECORD SYSTEM
          </div>
        </div>

        <!-- avatar welcome -->
        <div class="flex justify-center items-center">
          <div class="avatar placeholder">
            <div class="bg-accent-focus text-neutral-content rounded-full w-12">
              <span>{{getAvatar}}</span>
            </div>
          </div>
          <div class="ml-2">Hello! {{email}}</div>
        </div>
        <div v-for="items in route" :key="items.index">
          <li class="hover:bg-base-100 my-2">
            <router-link :to="items.path" @click="closeDrawer()"
              ><component :is="items.icon"></component
              >{{ items.name }}</router-link
            >
          </li>
        </div>
        <div class="flex flex-col grow justify-end mx-auto mb-10 w-1/3">
          <button class="btn btn-outline btn-error" @click="logout()">
            Keluar
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/authStore";

import home_icon from "@/components/icons/home_icon.vue";
import event_icon from "@/components/icons/event_icon.vue";
import person_icon from "@/components/icons/person_icon.vue";
export default {
  components: { home_icon, event_icon, person_icon },
  data() {
    return {
      email: useAuthStore().email,
      route: [
        { name: "Home", path: "/home", icon: "home_icon" },
        { name: "Event", path: "/event", icon: "event_icon" },
        { name: "Caleg", path: "/caleg", icon: "person_icon" },
      ],
    };
  },
  methods: {
    closeDrawer() {
      document.getElementById("my-drawer").click();
    },
    logout() {
      useAuthStore().logout()
      this.$router.push("/login");
    },
  },
  computed: {
    getAvatar(){
      const firstLetter = this.email.charAt(0);
      const secondLetter = this.email.charAt(1);
      return firstLetter.toUpperCase()+secondLetter.toUpperCase()
    }
  },
};
</script>
<style lang="css">
.link-active {
  color: #1dcdbc;
}
</style>
