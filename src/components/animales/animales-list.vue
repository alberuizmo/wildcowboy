<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado de animales</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push({name:'AnimalesCreate'})"
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
        <v-data-table :headers="headers" :items="animales" :search="search">
          <template v-slot:item.nacimiento="{ item }">{{formatFecha(item.nacimiento)}}</template>
          <template v-slot:item.comprado="{ item }">{{item.comprado==1?"Comprado":"Nacido"}}</template>
          <template v-slot:item.sexo="{ item }">{{item.sexo=="0"?"Hembra":"Macho"}}</template>
          <template
            v-slot:item.madre_id="{ item }"
          >{{item.madre_id?buscarPariente(item.madre_id):item.madre_nombre}}</template>
          <template
            v-slot:item.padre_id="{ item }"
          >{{item.madre_id?buscarPariente(item.padre_id):item.padre_nombre}}</template>
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
import { mapGetters, mapMutations } from "vuex";
import modalconfirm from "../generales/modalBoxConfirm";
import AnimalesService from "../../services/animales.service";
export default {
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
    ...mapMutations([]),
    formatFecha(fecha) {
      return this.$moment(fecha).format("DD/MM/YYYY");
    },
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
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.animalesService
        .getAllAnimales(data)
        .then((result) => {
          console.log(result);
          this.animales = result.data.data;
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
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>