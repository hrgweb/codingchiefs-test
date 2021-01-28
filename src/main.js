import Vue from "vue";
import router from "./router";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import store from "./store/store";

import App from "./App.vue";

window.axios = axios;
window.store = store;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
