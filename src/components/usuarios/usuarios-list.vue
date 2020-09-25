<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Usuarios</v-toolbar-title>
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
                    @click="$router.push({ name: 'UsuariosCreate' })"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Nuevo usuario</span>
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
        <v-data-table :headers="headers" :items="usuarios" :search="search">
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
import UsersService from "../../services/users.service";
export default {
  components: { modalconfirm },
  name: "usuarios-list",
  data() {
    return {
      usersService: null,
      usuarios: [],
      search: "",
      headers: [
        { text: "Identificación", value: "identificacion" },
        { text: "Username", value: "username" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Telefono", value: "telefono" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.usersService = new UsersService();
  },
  mounted() {
    this.recuperarUsuarios();
  },
  methods: {
    recuperarUsuarios() {
      this.usersService
        .getAllUsers()
        .then((result) => {
          this.usuarios = result.data.data.filter((item) => {
            return item.admin_finca != 1;
          });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.$router.push({
        name: "UsuariosCreate",
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
};
</script>

<style scoped></style>
