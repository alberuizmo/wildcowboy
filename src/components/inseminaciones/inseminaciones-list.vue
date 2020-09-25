<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Servicios</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="$router.push({name:'InseminacionesCreate'})"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nuevo servicio</span>
              </v-tooltip>
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
          <!-- <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>-->
        </v-data-table>
      </v-card>
    </v-col>
    <modalconfirm ref="modalConfirm"></modalconfirm>
  </v-row>
</template>

<script>
import modalconfirm from "../generales/modalBoxConfirm";
import InseminacionesService from "../../services/inseminaciones.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
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
        { text: "Tipo de Inseminación", value: "arficial" },
        { text: "Código Pajilla", value: "codigo_pajilla" },
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
    recuperarInseminaciones() {
      this.inseminacionesService
        .getAllinseminaciones()
        .then((result) => {
          this.inseminacionesData = result.data.data.map((item) => {
            item.arficial = item.arficial == 0 ? "Monta Directa" : "Artificial";
            item.fecha = this.formatFecha(item.fecha);
            return item;
          });
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
};
</script>

<style scoped></style>