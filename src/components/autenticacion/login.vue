<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col cols="3" class="d-flex justify-center">
          <img src="../../assets/img/circle-cropped.png" height="130" />
        </v-col>
        <v-col cols="6">
          <v-form>
            <v-text-field
              id="username"
              label="Username"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="dataLogin.username"
            ></v-text-field>
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="dataLogin.password"
            ></v-text-field>
          </v-form>
          <p class="text-right link">Recuperar contraseña</p>
          <p class="text-right link" @click="irRegistro()">Registrate</p>
          <p class="text-right">
            <v-btn
              color="primary"
              @click="acceder()"
              :loading="loading"
              :disabled="loading"
              >Acceder</v-btn
            >
          </p>
        </v-col>
        <v-col cols="3" class="d-flex justify-center">
          <img src="../../assets/img/logo-italcol.png" height="120" />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import AuthServices from "../../services/auth.service";
export default {
  name: "login",
  data() {
    return {
      dataLogin: { username: "", password: "" },
      loading: false,
      authServices: null,
    };
  },
  created() {
    this.authServices = new AuthServices();
  },
  methods: {
    ...mapMutations(["setUsuario", "setFinca", "setToken"]),
    acceder() {
      this.loading = true;
      this.authServices
        .login(this.dataLogin)
        .then((result) => {
          if (result.data.token != null) {
            this.setUsuario(result.data.usuario);
            this.setFinca(result.data.finca);
            this.setToken(result.data.token);
            this.$router.push({ name: "Modules" });
          }
          this.loading = false;
        })
        .catch(() => {});
    },
    irRegistro() {
      console.log("registro");
      this.$emit("cambiar", "registrocomponent");
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
</style>
