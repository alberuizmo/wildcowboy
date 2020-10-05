import axios from "axios";
export default class ConsumosService {
  getAllConsumos() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "consumos/");
  }
  createConsumo(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "consumos/", data);
  }
  editConsumo(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "consumos/", data);
  }
  getConsumoById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "consumos/" + id);
  }
  deleteConsumo(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "consumos/" + id);
  }
}
