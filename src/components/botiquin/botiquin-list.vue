<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width: 100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Consumibles</v-toolbar-title>
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
                    @click="$router.push({ name: 'BotiquinCreate' })"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nueva consumible</span>
              </v-tooltip>
            </v-toolbar>
          </div>
          <div style="width: 100%">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="botiquinData" :search="search">
          <template v-slot:item.cantidad_existente="{ item }">
            <span
              v-bind:class="{ alert: item.cantidad_existente <= item.alerta }"
              >{{ item.cantidad_existente }}</span
            >
            <span
              class="alert ml-2"
              v-if="item.cantidad_existente <= item.alerta"
              >Alerta</span
            >
          </template>
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
import BotiquinService from "../../services/botiquin.service";
export default {
  components: { modalconfirm },
  name: "botiquin-list",
  data() {
    return {
      botiquinService: null,
      search: "",
      headers: [
        { text: "Código", value: "codigo" },
        { text: "Consumible", value: "medicina" },
        { text: "Existencia", value: "cantidad_existente" },
        { text: "Unidades", value: "unidades" },
        { text: "Presentación", value: "presentacion" },
        { text: "Marca", value: "marca" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      botiquinData: [],
    };
  },
  created() {
    this.botiquinService = new BotiquinService();
  },
  mounted() {
    this.recuperarBotiquin();
  },
  methods: {
    ...mapMutations([]),
    recuperarBotiquin() {
      this.botiquinService
        .getAllMedicinas()
        .then((result) => {
          this.botiquinData = result.data.data;
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "BotiquinCreate",
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
            this.deletebotiquinData(item);
          }
        });
    },
  },
  computed: {
    ...mapGetters([]),
  },
};
</script>

<style scoped>
.alert {
  font-weight: 800;
  color: red;
}
</style>