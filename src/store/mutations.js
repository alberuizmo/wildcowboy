const getDefaultState = () => {
  return {
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
  };
};

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setUsuario(state, payload) {
    state.usuario = { ...payload };
  },
  setFinca(state, payload) {
    state.finca = { ...payload };
  },
  setToken(state, payload) {
    state.token = payload;
  },
};
