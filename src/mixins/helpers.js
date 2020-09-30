import { store } from "../store/store";
export const Helpers = {
  methods: {
    tienePermiso(idPermiso) {
      return store.getters.getPermisosDetallados.find((item) => {
        return item == idPermiso;
      });
    },
    colorAleatorio() {
      var hexadecimal = new Array(
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
      );
      var color_aleatorio = "#";
      for (let i = 0; i < 6; i++) {
        var numPosibilidades = hexadecimal.length - 0;
        var aleat = Math.random() * numPosibilidades;
        aleat = Math.floor(aleat);
        var posarray = parseInt(0) + aleat;
        color_aleatorio += hexadecimal[posarray];
      }
      return color_aleatorio;
    },
    generarToken() {
      return (
        Math.random()
          .toString(36)
          .substring(2, 5) +
        Math.random()
          .toString(36)
          .substring(2, 5)
      );
    },
    formatFecha(fecha) {
      return this.$moment(fecha).format("DD/MM/YYYY");
    },
    fechaAleatoria(start, end) {
      let fecha = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return fecha;
    },
    numeroRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
