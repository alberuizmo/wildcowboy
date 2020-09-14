import axios from "axios";
export default class ProduccionService {
  getProduccionPorFinca(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/finca/",
      data
    );
  }
  getProduccionPorSemana(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/semana/",
      data
    );
  }
  getProduccionPorAnimal(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/animal/",
      data
    );
  }
  createProduccion(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/",
      data
    );
  }
  editAnimal(data) {
    return axios.put(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/",
      data
    );
  }
  getProduccionById(id) {
    return axios.get(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/" + id
    );
  }
  deleteAnimal(id) {
    return axios.delete(
      process.env.VUE_APP_API_PUBLIC + "produccion_lechera/" + id
    );
  }
}
