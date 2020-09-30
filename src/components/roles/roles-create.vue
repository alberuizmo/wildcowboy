<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Creación de roles
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="3">
          <v-text-field
            label="Nombre"
            v-model="rolData.rol"
            hint="Ingresa el nombre del rol"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="9">
          <v-select
            multiple
            chips
            item-text="nombre"
            :items="permisos"
            label="Permisos Asignados"
            outlined
            return-object
            v-model="permisoSelected"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-btn color="primary" dark class="ml-3" @click="guardar()"
        >Guardar</v-btn
      >
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({ name: 'RolesList' })"
        >Cancelar</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import RolesService from "../../services/roles.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
  name: "roles-create",
  data() {
    return {
      rolesService: null,
      type: "create",
      permisos: [],
      rolData: {
        id: 0,
        rol: "",
      },
      permisoSelected: [],
    };
  },
  created() {
    this.rolesService = new RolesService();
  },
  mounted() {
    this.recuperarPermisos();
    if (this.$route.params.id) {
      this.type = "edit";
      //si es edicion recuperar el potrero
      this.rolesService
        .getRolById(this.$route.params.id)
        .then((result) => {
          this.rolData.id = result.data.data.rol.id;
          this.rolData.rol = result.data.data.rol.rol;
          this.permisoSelected = result.data.data.permisos;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    recuperarPermisos() {
      this.rolesService
        .getAllPermisos()
        .then((result) => {
          this.permisos = result.data.data;
        })
        .catch(() => {});
    },
    async guardar() {
      if (this.permisoSelected.length == 0) {
        payload = {
          text: "Debe asignarle al menos un permiso al rol",
          snackbar: true,
          color: "warning",
        };
        this.$emit("mostrarMensaje", payload);
        return false;
      }
      let payload = null;
      if (this.type == "create") {
        //hacer peticion a servicio de creacion
        let idRolCreado = null;
        await this.rolesService
          .createRol(this.rolData)
          .then((result) => {
            idRolCreado = result.data.id_creado;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
        let data = {
          rol_id: idRolCreado,
          permisos_ids: this.permisoSelected.map((item) => {
            return item.id;
          }),
        };
        await this.rolesService
          .createRolPermiso(data)
          .then((result) => {
            console.log(result);
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            setTimeout(() => {
              this.$router.push({ name: "RolesList" });
            }, 2000);
          })
          .catch(() => {});
      } else {
        //hace rpeticion al servicio de edicion
        payload = {
          text: "Registro editado exitosamente",
          snackbar: true,
          color: "success",
        };
        this.$emit("mostrarMensaje", payload);
        setTimeout(() => {
          this.$router.push({ name: "RolesList" });
        }, 2000);
      }
    },
  },
};
</script>

<style scoped></style>
