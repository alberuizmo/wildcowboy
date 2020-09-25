import axios from "axios";
export default class EnfermedadesService {
  getAllEnfermedades() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "enfermedades/");
  }
  createEnfermedad(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "enfermedades/", data);
  }
  editEnfermedad(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "enfermedades/", data);
  }
  getEnfermedadById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "enfermedades/" + id);
  }
  deleteEnfermedad(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "enfermedades/" + id);
  }
}
