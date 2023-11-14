import "./style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from "./App.vue";
import router from "./router";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedState));
app.use(router);
app.component('EasyDataTable', Vue3EasyDataTable);

app.mount("#app");
