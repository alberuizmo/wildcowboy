import axios from "axios";
export default class FincasService {
  getAllFincas() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "fincas/");
  }
  createFinca(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "fincas/", data);
  }
  getFincaById() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "fincas/");
  }
}
