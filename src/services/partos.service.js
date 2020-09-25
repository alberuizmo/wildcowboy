import axios from "axios";
export default class PartosService {
  getAllPartos() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "partos/");
  }
  createParto(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "partos/", data);
  }
  editParto(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "partos/", data);
  }
  getPartoById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "partos/" + id);
  }
  deleteParto(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "partos/" + id);
  }
}
