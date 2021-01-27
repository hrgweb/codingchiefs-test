import Vue from "vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import App from "./App.vue";

window.axios = axios;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
