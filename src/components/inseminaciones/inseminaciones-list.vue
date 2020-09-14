<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado inseminaciones</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push({name:'InseminacionesCreate'})"
                >Nuevo registro</v-btn>
              </template>
            </v-toolbar>
          </div>
          <div style="width:100%">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="inseminacionesData" :search="search">
          <template v-slot:item.fecha="{ item }">
            <span>{{item.fecha | formatear_fecha}}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <modalconfirm ref="modalConfirm"></modalconfirm>
  </v-row>
</template>

<script>
import modalconfirm from "../generales/modalBoxConfirm";
import { mapGetters, mapMutations } from "vuex";
import InseminacionesService from "../../services/inseminaciones.service";
export default {
  components: { modalconfirm },
  name: "inseminaciones-list",
  data() {
    return {
      inseminacionesService: null,
      search: "",
      headers: [
        { text: "Animal Inseminado", value: "nombre_animal" },
        { text: "Animal Donante", value: "donante_nombre" },
        { text: "Fecha", value: "fecha" },
        { text: "Observaciones", value: "observaciones" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      inseminacionesData: [],
    };
  },
  created() {
    this.inseminacionesService = new InseminacionesService();
  },
  mounted() {
    this.recuperarInseminaciones();
  },
  methods: {
    ...mapMutations(["deleteinseminacionesData"]),
    recuperarInseminaciones() {
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.inseminacionesService
        .getAllinseminaciones(data)
        .then((result) => {
          this.inseminacionesData = result.data.data;
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "InseminacionesCreate",
        params: { id: item.id },
      });
    },
    deleteItem(item) {
      var tituloConfirm = "Eliminar registro";
      var mensajeConfirm = "¿Desea eliminar el registro seleccionado?";
      this.$refs.modalConfirm
        .open(tituloConfirm, mensajeConfirm)
        .then((result) => {
          if (result) {
            this.deleteinseminacionesData(item);
          }
        });
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>