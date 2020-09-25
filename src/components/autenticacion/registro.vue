<template>
  <v-card-text>
    <v-stepper v-model="paso">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="paso > 1">Registrar Finca</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2">Usuario Administrador</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-2" height="270">
            <v-form ref="form" v-model="valid" lazy-validation style="height: 100%;">
              <v-container fluid class="fill-height">
                <v-row style="height: 100%;">
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="finca.nombre"
                      :rules="nombreRules"
                      label="Nombre de la finca"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="finca.direccion"
                      :rules="direccionRules"
                      label="Dirección"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="8">
                    <div id="mapa" ref="mapa"></div>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
          <v-btn color="primary" @click="siguiente()" :disabled="!valid" class="mr-4">Continuar</v-btn>
          <v-btn text @click="irLogin()">Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-2" height="270">
            <v-form ref="formUser" v-model="validUser" lazy-validation>
              <v-row>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.identificacion"
                    :rules="[(v) => !!v || 'La identificación es requerida']"
                    maxlength="30"
                    label="Identificación"
                    required
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.nombre"
                    :rules="[(v) => !!v || 'El nombre de usuario es requerido']"
                    maxlength="30"
                    label="Nombre"
                    required
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.apellidos"
                    :rules="[(v) => !!v || 'Los apellidos son requerido']"
                    maxlength="30"
                    label="Apellidos"
                    required
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.username"
                    :rules="[(v) => !!v || 'El username es requerido']"
                    maxlength="30"
                    label="Username"
                    required
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.telefono"
                    :rules="[(v) => !!v || 'El teléfono es requerido']"
                    maxlength="30"
                    label="Telefono"
                    required
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.email"
                    :rules="[(v) => !!v || 'El email es requerido']"
                    maxlength="30"
                    label="Email"
                    required
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" no-gutters>
                  <v-text-field
                    v-model="usuario.password"
                    :rules="[(v) => !!v || 'El password es requerido']"
                    maxlength="30"
                    label="Password"
                    required
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn color="primary" :loading="loading" @click="guardar()">Guardar</v-btn>
          <v-btn text @click="irLogin()">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-snackbar v-model="snackbar" :color="color">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-card-text>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import UsersService from "../../services/users.service";
import FincasService from "../../services/fincas.service";
export default {
  name: "registrofinca-usurio",
  data() {
    return {
      loading: false,
      snackbar: false,
      text: "",
      color: "error",
      marcador: null,
      usersService: null,
      fincasService: null,
      google: null,
      map: null,
      paso: 1,
      valid: false,
      finca: { nombre: "", direccion: "", cx: 0, cy: 0 },
      usuario: {
        identificacion: "",
        username: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        password: "",
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
    this.usersService = new UsersService();
    this.fincasService = new FincasService();
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: "AIzaSyAbA5cdg213Vkr_SQb0W2FGZPwxgG4tc-U",
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      let opciones = {
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      };
      var colombia = { lat: 4, lng: -74 };
      const mapContainer = this.$refs.mapa;
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: 10,
        center: colombia,
        options: opciones,
      });
      this.marcador = new this.google.maps.Marker({
        position: colombia,
        map: this.map,
        draggable: true,
      });

      this.marcador.addListener("dragend", () => {
        this.finca.cy = this.marcador.getPosition().lat();
        this.finca.cx = this.marcador.getPosition().lng();
        this.map.setZoom(16);
        this.map.setCenter(this.marcador.getPosition());
      });
    },
    siguiente() {
      if (this.finca.cy == 0 || this.finca.cx == 0) {
        this.text = "Debes ubicar la finca en el mapa";
        this.snackbar = true;
        return false;
      }
      if (this.$refs.form.validate()) {
        this.paso = 2;
      }
    },
    irLogin() {
      this.$emit("cambiar", "logincomponent");
    },
    async guardar() {
      let finca_id = "";
      let usuario_id = "";
      if (this.$refs.formUser.validate()) {
        //finca
        await this.fincasService
          .createFinca(this.finca)
          .then((response) => {
            finca_id = response.data.id_creado;
          })
          .catch(() => {
            return false;
          });
        //usuario
        this.usuario["finca_id"] = finca_id;
        await this.usersService
          .register(this.usuario)
          .then((response) => {
            usuario_id = response.data.id_creado;
          })
          .catch(() => {
            return false;
          });
        //finca-Usuario
        await this.usersService
          .createFincaUserAdmin({
            usuario_id,
            finca_id,
          })
          .then(() => {
            this.text = "usuario y finca creados satisfactoriamente";
            this.color = "success";
            this.snackbar = true;
            this.$emit("cambiar", "logincomponent");
          })
          .catch(() => {
            return false;
          });
      }
    },
    cancelar() {
      this.$emit("cambiar", "logincomponent");
    },
    acceder() {
      this.loading = true;
      setTimeout(() => {
        this.$router.push({ name: "Modules" });
        this.loading = false;
      }, 4000);
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--v-primary-base);
  cursor: pointer;
  transition: 0.3s all;
}

.link:hover {
  color: var(--v-secondary-base);
  font-weight: bold;
}

#mapa {
  height: 100%;
}
</style>
