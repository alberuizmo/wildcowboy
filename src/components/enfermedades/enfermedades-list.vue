<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Enfermedades</v-toolbar-title>
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
                    @click="$router.push({name:'EnfermedadesCreate'})"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nueva enfermedad</span>
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
        <v-data-table :headers="headers" :items="enfermedadesData" :search="search">
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
import { mapGetters, mapMutations } from "vuex";
import EnfermedadesService from "../../services/enfermedades.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
  components: { modalconfirm },
  name: "enfermedades-list",
  data() {
    return {
      enfermedadesService: null,
      search: "",
      headers: [
        { text: "Animal", value: "nombre_animal" },
        { text: "Enfermedad", value: "enfermedad" },
        { text: "Sintomas", value: "sintomas" },
        { text: "Fecha", value: "fecha" },
        { text: "Observaciones", value: "observaciones" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      enfermedadesData: [],
    };
  },
  created() {
    this.enfermedadesService = new EnfermedadesService();
  },
  mounted() {
    this.recuperarEnfermedades();
  },
  methods: {
    ...mapMutations([]),
    recuperarEnfermedades() {
      this.enfermedadesService
        .getAllEnfermedades()
        .then((result) => {
          this.enfermedadesData = result.data.data.map((item) => {
            item.fecha = this.formatFecha(item.fecha);
            return item;
          });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "EnfermedadesCreate",
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
            this.deleteenfermedadesData(item);
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