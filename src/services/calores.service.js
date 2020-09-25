import axios from "axios";
export default class CaloresService {
  getAllCalores() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "calores/");
  }
  createCalor(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "calores/", data);
  }
  editCalor(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "calores/", data);
  }
  getCalorById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "calores/" + id);
  }
  deleteCalor(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "calores/" + id);
  }
}
