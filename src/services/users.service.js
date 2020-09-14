import axios from "axios";
export default class UsersService {
  getAllUsers(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "/usuarios/all", data);
  }
  createUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "usuarios/", data);
  }

  getUserById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "usuarios/" + id);
  }

  createFincaUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "usuario-finca/", data);
  }
  createRolUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "usuario-rol/", data);
  }
}
