import axios from "axios";
export default class AuthService {
  login(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "login/", data);
  }
}
