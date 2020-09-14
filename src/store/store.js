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
      paths: ["usuario", "finca", "token", "modulos"],
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
        caption: "Ganaderia",
        value: "ganaderia",
        urlName: "Main",
        icon: "mdi-cow",
      },
    ],
  },
  mutations,
  actions,
  getters,
  modules: {},
});

/* import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        bornsData: [{
                id: 1,
                date: "14-02-2020",
                name: "Lucero",
                mother: "Madredita",
                father: "Padrecito",
                gender: {
                    id: 2,
                    value: "hembra",
                    caption: "Hembra"
                },
                number: "123",
                obs: ""
            },
            {
                id: 2,
                date: "12-05-2020",
                name: "Manchas",
                mother: "Mariposa",
                father: "Torito",
                gender: {
                    id: 1,
                    value: "macho",
                    caption: "Macho"
                },
                number: "1234",
                obs: ""
            },
            {
                id: 3,
                date: "01-03-2019",
                name: "Pecas",
                mother: "Flor",
                father: "Torero",
                gender: {
                    id: 1,
                    value: "macho",
                    caption: "Macho"
                },
                number: "741",
                obs: ""
            },
            {
                id: 4,
                date: "11-02-2020",
                name: "Lechera",
                mother: "Petunia",
                father: "Luisito",
                gender: {
                    id: 2,
                    value: "hembra",
                    caption: "Hembra"
                },
                number: "9658",
                obs: ""
            },
            {
                id: 5,
                date: "10-05-2020",
                name: "Mama vaca",
                mother: "Tere",
                father: "Patotas",
                gender: {
                    id: 2,
                    value: "hembra",
                    caption: "Hembra"
                },
                number: "7485",
                obs: ""
            }
        ],
        animales: [{
                id: 1,
                nro_animal: "1234546",
                name: "Petunia",
            },
            {
                id: 2,
                nro_animal: "987654",
                name: "Vaquita",
            },
            {
                id: 3,
                nro_animal: "A98563",
                name: "Flor",
            },
        ],
        fertilizacionData: [{
            id: 1,
            nro_potrero: "2563",
            nro_animal: {
                id: 2,
                nro_animal: "987654",
                name: "Vaquita",
            },
            f_entrada: "30-05-2020",
            f_salida: "03-06-2020",
            producto: "Vaca",
            cantidad: "3",
            f_fertilizacion: "01-06-2020",
            descanso: 3,
            obs: "",
        }, {
            id: 2,
            nro_potrero: "2563",
            nro_animal: {
                id: 1,
                nro_animal: "123456",
                name: "Petunia",
            },
            f_entrada: "30-05-2020",
            f_salida: "03-06-2020",
            producto: "Vaca",
            cantidad: "3",
            f_fertilizacion: "01-06-2020",
            descanso: 3,
            obs: "",
        }],
        weeks: [{
                id: 1,
                desde: '2020-06-07',
                hasta: '2020-06-13',
                week: "07-06-2020 al 13-06-2020",
            },
            {
                id: 2,
                desde: '2020-06-14',
                hasta: '2020-06-20',
                week: "14-06-2020 al 20-06-2020",
            },
            {
                id: 3,
                desde: '2020-07-26',
                hasta: '2020-08-01',
                week: "26-07-2020 al 01-08-2020",
            },
        ],
        productionData: [{
                id: "1",
                week: {
                    id: 1,
                    desde: '2020-06-07',
                    hasta: '2020-06-13',
                    week: "07-06-2020 al 13-06-2020",
                },
                nro_animal: {
                    id: 3,
                    nro_animal: "A98563",
                    name: "Flor",
                },
                dl: "400",
                kls: "500",
                dm: "6",
                dt: "10",
                lm: "",
                lt: "",
                mm: "",
                mt: "",
                mim: "",
                mit: "",
                jm: "",
                jt: "",
                vm: "",
                vt: "",
                sm: "",
                st: "",
            },
            {
                id: "2",
                week: {
                    id: 3,
                    desde: '2020-07-26',
                    hasta: '2020-08-01',
                    week: "26-07-2020 al 01-08-2020",
                },
                nro_animal: {
                    id: 2,
                    nro_animal: "987654",
                    name: "Vaquita",
                },
                dl: "552",
                kls: "514",
                dm: "6",
                dt: "",
                lm: "",
                lt: "",
                mm: "",
                mt: "",
                mim: "",
                mit: "",
                jm: "",
                jt: "",
                vm: "",
                vt: "",
                sm: "",
                st: "",
            },
        ]
    },
    mutations: {
        pushBornData(state, item) {
            state.bornsData.push(item)
        },
        deleteBornData(state, item) {
            let indexDeleted = state.bornsData.findIndex(itemDeleted => {
                return itemDeleted == item;
            });
            if (indexDeleted != -1) {
                state.bornsData.splice(indexDeleted, 1);
            }
        },
        replaceBornData(state, item) {
            let indexDeleted = state.bornsData.findIndex(itemDeleted => {
                return itemDeleted.id == item.id;
            });
            if (indexDeleted != -1) {
                state.bornsData.splice(indexDeleted, 1, item);
            }
        },
        pushFertilizacionData(state, item) {
            state.fertilizacionData.push(item)
        },
        deleteFertilizacionData(state, item) {
            let indexDeleted = state.fertilizacionData.findIndex(itemDeleted => {
                return itemDeleted == item;
            });
            if (indexDeleted != -1) {
                state.fertilizacionData.splice(indexDeleted, 1);
            }
        },
        replaceFertilizacionData(state, item) {
            let indexDeleted = state.fertilizacionData.findIndex(itemDeleted => {
                return itemDeleted.id == item.id;
            });
            if (indexDeleted != -1) {
                state.fertilizacionData.splice(indexDeleted, 1, item);
            }
        },
        pushProductionData(state, data) {
            console.log(state.productionData)
            let encontrado = false
            for (let index = 0; index < state.productionData.length; index++) {
                const element = state.productionData[index];
                if (element.week.desde == data.desde && element.week.hasta == data.hasta && element.nro_animal.nro_animal == data.identificacion) {
                    state.productionData[index][data.momento] = data.cantidad;
                    encontrado = true
                }
            }
            if (!encontrado) {
                let animal = state.animales.filter(item => {
                    return item.nro_animal == data.identificacion
                })

                let codigo = Math.random()
                    .toString(36)
                    .substring(2, 13) +
                    Math.random()
                    .toString(36)
                    .substring(2, 13)

                let dataPush = {
                    id: codigo,
                    week: {
                        id: 3,
                        desde: '2020-07-26',
                        hasta: '2020-08-01',
                        week: "26-07-2020 al 01-08-2020",
                    },
                    nro_animal: animal[0],
                    dl: "",
                    kls: "",
                    dm: "",
                    dt: "",
                    lm: "",
                    lt: "",
                    mm: "",
                    mt: "",
                    mim: "",
                    mit: "",
                    jm: "",
                    jt: "",
                    vm: "",
                    vt: "",
                    sm: "",
                    st: "",
                }

                dataPush[data.momento] = data.cantidad;

                state.productionData.push(dataPush)
            }
            console.log(state.productionData)
        },
        deleteProductionData(state, item) {
            let indexDeleted = -1
            for (let index = 0; index < state.productionData.length; index++) {
                const element = state.productionData[index];
                if (element.id == item.id) {

                    indexDeleted = index
                }
            }
            if (indexDeleted != -1) {
                state.productionData.splice(indexDeleted, 1);
            }
        },
    },
    actions: {},
    getters: {
        getBornData(state) {
            return state.bornsData
        },
        getBornDataById(state) {
            return (id) => {
                let indexSearched = state.bornsData.findIndex(item => {
                    return item.id == id;
                });
                return state.bornsData[indexSearched]
            }
        },
        getListaAnimales(state) {
            return state.animales
        },
        getFertilizacionData(state) {
            return state.fertilizacionData
        },
        getFertilizacionDataById(state) {
            return (id) => {
                let indexSearched = state.fertilizacionData.findIndex(item => {
                    return item.id == id;
                });
                return state.fertilizacionData[indexSearched]
            }
        },
        getWeeks(state) {
            return state.weeks
        },
        getProductionData(state) {
            return state.productionData
        },
    },
    modules: {

    }
}) */
