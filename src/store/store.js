import Vue from "vue";
import Vuex from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "wildcowboy",
      paths: ["usuario", "finca", "token"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    usuario: null,
    finca: null,
    token: null,
    modulos: [
      {
        id: 1,
        caption: "Atención al usuario",
        value: "helpcenter",
        urlName: "Help",
        icon: "mdi-help-circle",
      },
      {
        id: 2,
        caption: "Tareas",
        value: "tasks",
        urlName: "Tasks",
        icon: "mdi-format-align-justify",
      },
      {
        id: 3,
        caption: "Agro",
        value: "agro",
        urlName: "DashboardAgro",
        icon: "mdi-sprout-outline",
      },
      {
        id: 4,
        caption: "Equinos",
        value: "equinos",
        urlName: "DashboardEquinos",
        icon: "mdi-horse",
      },
      {
        id: 5,
        caption: "Ganaderia",
        value: "ganaderia",
        urlName: "DashboardGanaderia",
        icon: "mdi-cow",
      },
      {
        id: 6,
        caption: "Administración",
        value: "administracion",
        urlName: "administracion",
        icon: "mdi-account-key",
      },
      {
        id: 7,
        caption: "MarkerPlace",
        value: "marketplace",
        urlName: "DashboardMarketplace",
        icon: "mdi-storefront",
      },
    ],
  },
  mutations,
  actions,
  getters,
  modules: {},
});
