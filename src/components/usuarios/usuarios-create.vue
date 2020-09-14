<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Creación de usuarios
      <hr />
    </v-col>
    <v-col cols="12">
      <v-form ref="formUser" v-model="validUser" lazy-validation>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.identificacion"
              :rules="[v => !!v || 'La identificación es requerida']"
              maxlength="30"
              label="Identificación"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.username"
              :rules="[v => !!v || 'El username es requerido']"
              maxlength="30"
              label="Username"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.nombre"
              :rules="[v => !!v || 'El nombre de usuario es requerido']"
              maxlength="30"
              label="Nombre"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.apellidos"
              :rules="[v => !!v || 'Los apellidos son requerido']"
              maxlength="30"
              label="Apellidos"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.telefono"
              :rules="[v => !!v || 'El teléfono es requerido']"
              maxlength="30"
              label="Telefono"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.email"
              :rules="[v => !!v || 'El email es requerido']"
              maxlength="30"
              label="Email"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuario.password"
              :rules="[v => !!v || 'El password es requerido']"
              maxlength="30"
              label="Password"
              required
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="rol"
              return-object
              item-text="rol"
              :items="roles"
              label="Rol"
              dense
              :rules="[v => !!v || 'El password es requerido']"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({ name: 'UsuariosList' })"
      >Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { Helpers } from "../../mixins/helpers";
import RolesService from "../../services/roles.service";
import UsersService from "../../services/users.service";
export default {
  mixins: [Helpers],
  name: "roles-create",
  data() {
    return {
      usersService: null,
      rolesService: null,
      rol: null,
      type: "create",
      permisos: [],
      finca_id: null,
      usuario_id: null,
      permisoSelected: [],
      roles: [],
      usuario: {
        identificacion: "",
        username: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        password: "",
        type: 0,
        finca_id: null,
      },
      nombreRules: [
        (v) => !!v || "El nombre es requerido",
        (v) =>
          v.length <= 100 || "El nombre debe tener menos de 100 caracteres",
      ],
      direccionRules: [
        (v) => !!v || "La dirección es requerida",
        (v) =>
          v.length <= 250 || "La dirección debe tener menos de 250 caracteres",
      ],
      validUser: false,
    };
  },
  created() {
    this.rolesService = new RolesService();
    this.usersService = new UsersService();
  },
  mounted() {
    if (this.$route.params.id) {
      this.finca_id = this.getFinca.id;
      this.usuario_id = this.getUsuario.id;
      this.recuperarDataUser();
    } else {
      this.finca_id = this.getFinca.id;
      this.usuario_id = this.getUsuario.id;
      this.usuario.finca_id = this.finca_id;
    }
    this.recuperarRoles();
  },
  methods: {
    ...mapMutations([]),
    async recuperarDataUser() {
      this.type = "edit";
      let rol_id;
      //si es edicion recuperar el usuarios
      await this.usersService
        .getUserById(this.$route.params.id)
        .then((result) => {
          rol_id = result.data.data.rol_id;
          this.usuario = { ...result.data.data };
          this.usuario.finca_id = this.finca_id;
        })
        .catch((err) => {
          console.log(err);
        });
      //si es edicion recuperar el rol del usuario
      await this.rolesService
        .getRolById(rol_id)
        .then((result) => {
          this.rol = result.data.data.rol;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    async guardar() {
      if (this.$refs.formUser.validate()) {
        //usuario
        let usuario_id;
        await this.usersService
          .createUser(this.usuario)
          .then((response) => {
            usuario_id = response.data.id_creado;
          })
          .catch(() => {
            return false;
          });
        //finca-Usuario
        await this.usersService
          .createFincaUser({
            usuario_id,
            finca_id: this.finca_id,
          })
          .then(() => {})
          .catch(() => {
            return false;
          });
        //rol-Usuario
        await this.usersService
          .createRolUser({
            usuario_id,
            rol_id: this.rol.id,
          })
          .then(() => {
            let payload = {
              text: "Registro creado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            setTimeout(() => {
              this.$router.push({ name: "UsuariosList" });
            }, 2000);
          })
          .catch(() => {
            return false;
          });
      }
      return false;
      /* if (this.$refs.formUser.validate()) {
        //usuario
        this.usuario["finca_id"] = this.finca_id;
        let usuario_id;
        await this.usersService
          .createUser(this.usuario)
          .then((response) => {
            usuario_id = response.data.id_creado;
          })
          .catch(() => {
            return false;
          });
        //finca-Usuario
        await this.usersService
          .createFincaUser({
            usuario_id,
            finca_id: this.finca_id,
          })
          .then(() => {})
          .catch(() => {
            return false;
          });
        //rol-Usuario
        await this.usersService
          .createRolUser({
            usuario_id,
            rol_id: this.rol.id,
          })
          .then(() => {
            let payload = {
              text: "Registro creado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            setTimeout(() => {
              this.$router.push({ name: "UsuariosList" });
            }, 2000);
          })
          .catch(() => {
            return false;
          });
      } else {
        //hace rpeticion al servicio de edicion
        let payload = {
          text: "Registro editado exitosamente",
          snackbar: true,
          color: "success",
        };
        this.$emit("mostrarMensaje", payload);
        setTimeout(() => {
          this.$router.push({ name: "UsuariosList" });
        }, 2000);
      } */
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario"]),
  },
};
</script>

<style scoped></style>
