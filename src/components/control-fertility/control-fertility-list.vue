<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado control de fertilidad</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push({name:'ControlFertilityCreate'})"
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
        <v-data-table :headers="headers" :items="fertilizacionData" :search="search">
          <template v-slot:header>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th colspan="3" class="text-center" style="border:1px solid #dbdbdb">Fertilización</th>
              </tr>
            </thead>
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
export default {
  components: { modalconfirm },
  name: "control-fertility-list",
  data() {
    return {
      search: "",
      headers: [
        { text: "Nro Potrero", value: "nro_potrero" },
        { text: "Nro Animal", value: "nro_animal.nro_animal" },
        { text: "Entrada", value: "f_entrada" },
        { text: "Salida", value: "f_salida" },
        { text: "Producto", value: "producto" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Fecha", value: "f_fertilizacion" },
        { text: "Dias descanso", value: "descanso" },
        { text: "Observaciones", value: "obs" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      fertilizacionData: [],
    };
  },
  mounted() {
    this.fertilizacionData = this.getFertilizacionData;
  },
  methods: {
    ...mapMutations(["deleteFertilizacionData"]),
    editItem(item) {
      this.$router.push({
        name: "ControlFertilityCreate",
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
            this.deleteFertilizacionData(item);
          }
        });
    },
  },
  computed: {
    ...mapGetters(["getFertilizacionData"]),
  },
};
</script>

<style scoped></style>