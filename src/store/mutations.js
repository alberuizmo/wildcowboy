const getDefaultState = () => {
  return {};
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
