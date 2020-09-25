<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Calores</v-toolbar-title>
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
                    @click="$router.push({name:'CaloresCreate'})"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nueva inspección de calor</span>
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
        <v-data-table :headers="headers" :items="caloresData" :search="search">
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
import CaloresService from "../../services/calores.service";
export default {
  components: { modalconfirm },
  name: "calores-list",
  data() {
    return {
      caloresService: null,
      search: "",
      headers: [
        { text: "Animal", value: "nombre_animal" },
        { text: "Fecha", value: "fecha" },
        { text: "En calor", value: "en_calor" },
        { text: "Post-Inseminación", value: "post_inseminacion" },
        { text: "Observaciones", value: "observaciones" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      caloresData: [],
    };
  },
  created() {
    this.caloresService = new CaloresService();
  },
  mounted() {
    this.recuperarCalores();
  },
  methods: {
    recuperarCalores() {
      this.caloresService
        .getAllCalores()
        .then((result) => {
          this.caloresData = result.data.data.map((item) => {
            item.fecha = this.$moment(item.fecha).format("DD-MM-YYYY");
            item.en_calor == 0
              ? (item.en_calor = "NO")
              : (item.en_calor = "SI");
            item.post_inseminacion == 0
              ? (item.post_inseminacion = "NO")
              : (item.post_inseminacion = "SI");
            return item;
          });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "CaloresCreate",
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
            this.deletecaloresData(item);
          }
        });
    },
  },
};
</script>

<style scoped></style>