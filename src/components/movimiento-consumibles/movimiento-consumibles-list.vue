<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width: 100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Movimiento de Consumibles</v-toolbar-title>
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
                    @click="
                      $router.push({ name: 'MovimientosConsumiblesCreate' })
                    "
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Registrar consumo</span>
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
        <v-data-table :headers="headers" :items="ConsumosData" :search="search">
          <!-- <template v-slot:item.cantidad="{ item }">
            <span v-bind:class="{ alert: item.cantidad<=item.alerta }">{{item.cantidad}}</span>
            <span class="alert ml-2" v-if="item.cantidad<=item.alerta">Alerta</span>
          </template> -->
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
import ConsumosService from "../../services/consumos.service";
export default {
  components: { modalconfirm },
  name: "consumos-list",
  data() {
    return {
      ConsumosService: null,
      search: "",
      headers: [
        { text: "Consumible", value: "medicina" },
        { text: "Tipo de consumo", value: "tipo_movimiento" },
        { text: "Cantidad", value: "cantidad_consumida" },
        { text: "Unidades", value: "unidades" },
        { text: "Marca", value: "marca" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      ConsumosData: [],
    };
  },
  created() {
    this.consumosService = new ConsumosService();
  },
  mounted() {
    this.recuperarConsumos();
  },
  methods: {
    ...mapMutations([]),
    recuperarConsumos() {
      this.consumosService
        .getAllConsumos()
        .then((result) => {
          this.ConsumosData = result.data.data.map((item) => {
            item.tipo_movimiento =
              item.tipo_movimiento == 1 ? "Entrada" : "Salida";
            return item;
          });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "MovimientosConsumiblesCreate",
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