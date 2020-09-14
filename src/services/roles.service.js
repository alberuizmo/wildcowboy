import axios from "axios";
export default class RolesService {
  getAllRoles(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "roles/all/", data);
  }
  createRol(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "roles/create/", data);
  }
  createRolPermiso(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "roles/permisos/", data);
  }
  editRol(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "roles/", data);
  }
  getRolById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "roles/" + id);
  }
  deleteRol(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "roles/" + id);
  }
  getAllPermisos() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "permisos/");
  }
}
