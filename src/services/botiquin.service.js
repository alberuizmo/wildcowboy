import axios from "axios";
export default class BotiquinService {
  getAllMedicinas(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "botiquin/all/", data);
  }
  createMedicina(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "botiquin/", data);
  }
  editMedicina(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "botiquin/", data);
  }
  getMedicinaById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "botiquin/" + id);
  }
  deleteMedicina(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "botiquin/" + id);
  }
}
