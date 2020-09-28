import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import { store } from "./store/store";
import vuetify from "./plugins/vuetify";
import "./services/axiosInterceptor";
//lector de codigo qr
import VueQrcodeReader from "vue-qrcode-reader";
Vue.use(VueQrcodeReader);

//importacion y configuracion de moment
import VueMoment from "vue-moment";
import moment from "moment-timezone";
moment.tz.setDefault("America/Bogota");
moment.locale("es"); // cambio el idioma de moment a español

import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

// filtros o modificadores globales
//transforma la primera letra de cada palabra de una frase en mayuscula
Vue.filter("formatear_fecha", function(fecha) {
  return moment(fecha).format("DD-MM-YYYY");
});

Vue.use(VueMoment, {
  moment,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
