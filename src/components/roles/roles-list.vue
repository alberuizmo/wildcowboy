<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado de roles</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push({ name: 'RolesCreate' })"
                >Nuevo rol</v-btn>
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
        <v-data-table :headers="headers" :items="roles" :search="search">
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
import RolesService from "../../services/roles.service";
export default {
  components: { modalconfirm },
  name: "roles-list",
  data() {
    return {
      rolesService: null,
      roles: [],
      search: "",
      headers: [
        { text: "Rol", value: "rol" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.rolesService = new RolesService();
  },
  mounted() {
    this.recuperarRoles();
  },
  methods: {
    ...mapMutations([]),
    recuperarRoles() {
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.rolesService
        .getAllRoles(data)
        .then((result) => {
          this.roles = result.data.data;
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "RolesCreate",
        params: { id: item.id },
      });
    },
    deleteItem() {
      var tituloConfirm = "Eliminar registro";
      var mensajeConfirm = "¿Desea eliminar el rol seleccionado?";
      this.$refs.modalConfirm
        .open(tituloConfirm, mensajeConfirm)
        .then((result) => {
          if (result) {
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
