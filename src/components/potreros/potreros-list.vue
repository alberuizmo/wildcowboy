<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Potreros</v-toolbar-title>
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
                    @click="$router.push({ name: 'PotrerosCreate' })"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nuevo potrero</span>
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
        <v-data-table :headers="headers" :items="potreros" :search="search">
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
import { mapGetters, mapMutations } from "vuex";
import modalconfirm from "../generales/modalBoxConfirm";
import PotrerosService from "../../services/potreros.service";
export default {
  components: { modalconfirm },
  name: "potreros-list",
  data() {
    return {
      potrerosService: null,
      potreros: [],
      search: "",
      headers: [
        { text: "Finca", value: "nombre_finca" },
        { text: "Identificacion", value: "identificacion" },
        { text: "Nombre", value: "nombre" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.potrerosService = new PotrerosService();
  },
  mounted() {
    this.recuperarPotreros();
  },
  methods: {
    ...mapMutations([]),
    recuperarPotreros() {
      this.potrerosService
        .getAllPotreros()
        .then((result) => {
          this.potreros = result.data.data;
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "PotrerosCreate",
        params: { id: item.id },
      });
    },
    deleteItem(item) {
      var tituloConfirm = "Eliminar registro";
      var mensajeConfirm = "¿Desea eliminar el potrero seleccionado?";
      this.$refs.modalConfirm
        .open(tituloConfirm, mensajeConfirm)
        .then((result) => {
          if (result) {
            this.deleteBornData(item);
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
