<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Partos</v-toolbar-title>
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
                    @click="$router.push({name:'PartosCreate'})"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nuevo parto</span>
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
        <v-data-table :headers="headers" :items="partosData" :search="search">
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
import PartosService from "../../services/partos.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
  components: { modalconfirm },
  name: "partos-list",
  data() {
    return {
      partosService: null,
      search: "",
      headers: [
        { text: "Animal", value: "nombre_animal" },
        { text: "Crias", value: "hijos" },
        { text: "Fecha", value: "fecha" },
        { text: "Observaciones", value: "observaciones" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      partosData: [],
    };
  },
  created() {
    this.partosService = new PartosService();
  },
  mounted() {
    this.recuperarPartos();
  },
  methods: {
    recuperarPartos() {
      this.partosService
        .getAllPartos()
        .then((result) => {
          this.partosData = result.data.data.map((item) => {
            item.fecha = this.formatFecha(item.fecha);
            return item;
          });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "PartosCreate",
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
            this.deletepartosData(item);
          }
        });
    },
  },
};
</script>

<style scoped></style>