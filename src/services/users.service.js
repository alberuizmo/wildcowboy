import axios from "axios";
export default class UsersService {
  getAllUsers(data) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "/usuarios/", data);
  }
  createUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "usuarios/", data);
  }
  getUserById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "usuarios/" + id);
  }
  createFincaUserAdmin(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "usuario-finca-admin/",
      data
    );
  }
  createFincaUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "usuario-finca/", data);
  }
  createRolUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "usuario-rol/", data);
  }
  login(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "login/", data);
  }
  register(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "register/", data);
  }
}
