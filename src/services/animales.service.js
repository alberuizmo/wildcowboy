import axios from "axios";
export default class AnimalesService {
  getAllAnimales(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "animales/all/", data);
  }
  createAnimal(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "animales/", data);
  }
  editAnimal(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "animales/", data);
  }
  getAnimalById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "animales/" + id);
  }
  deleteAnimal(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "animales/" + id);
  }
}
