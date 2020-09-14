import axios from "axios";
export default class InseminacionesService {
  getAllinseminaciones(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "inseminaciones/all/",
      data
    );
  }
  createInseminacion(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "inseminaciones/", data);
  }
  getInseminacionById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "inseminaciones/" + id);
  }
  editInseminacion(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "inseminaciones/", data);
  }
  deleteInseminacion(id) {
    return axios.delete(
      process.env.VUE_APP_API_PUBLIC + "inseminaciones/" + id
    );
  }
}
