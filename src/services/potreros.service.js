import axios from "axios";
export default class PotrerosService {
  getAllPotreros(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "potreros/all/", data);
  }
  createPotrero(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "potreros/", data);
  }
  editPotrero(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "potreros/", data);
  }
  getPotreroById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "potreros/" + id);
  }
  deletePotrero(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "potreros/" + id);
  }
}
