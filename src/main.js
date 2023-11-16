import "./style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import VueSweetAlert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedState));
app.use(router);
app.use(VueSweetAlert2);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("v-select", vSelect);

app.mount("#app");
