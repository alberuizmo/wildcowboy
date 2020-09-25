import axios from "axios";
export default class RolesService {
  getAllRoles() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "roles/");
  }
  getRolById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "roles/" + id);
  }
  createRol(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "roles/create/", data);
  }
  createRolPermiso(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "roles/permisos/", data);
  }
  getAllPermisos() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "permisos/");
  }
  editRol(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "roles/", data);
  }
  deleteRol(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "roles/" + id);
  }
}
