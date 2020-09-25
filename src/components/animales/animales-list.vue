<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Animales</v-toolbar-title>
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
                    @click="$router.push({name:'AnimalesCreate'})"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nuevo animal</span>
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
        <v-data-table :headers="headers" :items="animales" :search="search">
          <template
            v-slot:item.madre_id="{ item }"
          >{{item.madre_id?buscarPariente(item.madre_id):item.madre_nombre}}</template>
          <template
            v-slot:item.padre_id="{ item }"
          >{{item.madre_id?buscarPariente(item.padre_id):item.padre_nombre}}</template>
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
import AnimalesService from "../../services/animales.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
  components: { modalconfirm },
  name: "born-list",
  data() {
    return {
      animales: [],
      animalesService: null,
      search: "",
      headers: [
        { text: "Codigo", value: "codigo" },
        { text: "Identificación", value: "identificacion" },
        { text: "Comprado", value: "comprado" },
        { text: "Nacimiento", value: "nacimiento" },
        { text: "Nombre", value: "nombre" },
        { text: "Padre", value: "padre_id" },
        { text: "Madre", value: "madre_id" },
        { text: "Sexo", value: "sexo" },
        { text: "Color", value: "color" },
        { text: "Potrero", value: "nombre_potrero" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.animalesService = new AnimalesService();
  },
  mounted() {
    this.obtenerAnimales();
  },
  methods: {
    buscarPariente(pariente_id) {
      let buscar = this.animales.filter((item) => {
        return item.id == pariente_id;
      });
      if (buscar.length == 0) {
        return "";
      } else {
        return buscar[0].nombre;
      }
    },
    obtenerAnimales() {
      this.animalesService
        .getAllAnimales()
        .then((result) => {
          this.animales = result.data.data.map((item) => {
            item.comprado = item.comprado == 1 ? "Comprado" : "Nacido";
            item.sexo = item.sexo = item.sexo == "0" ? "Hembra" : "Macho";
            item.nacimiento = this.formatFecha(item.nacimiento);
            return item;
          });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "AnimalesCreate",
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
            console.log(item);
            //this.deleteBornData(item);
          }
        });
    },
  },
};
</script>

<style scoped></style>