<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado de potreros</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push({ name: 'PotrerosCreate' })"
                  >Nuevo potrero</v-btn
                >
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
        <v-data-table :headers="headers" :items="potreros" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
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
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.potrerosService
        .getAllPotreros(data)
        .then((result) => {
          console.log(result);
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
