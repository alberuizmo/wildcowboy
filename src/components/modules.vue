<template>
  <v-app id="inspire">
    <v-container class="fill-height pa-0" fluid>
      <!-- <span class="bg"></span> -->
      <v-row class="fill-height pa-0 ma-0" align="center" justify="center">
        <v-col
          cols="12"
          md="6"
          class="bg fill-height text-right d-none d-md-flex"
        >
          <img src="../assets/img/circle-cropped.png" height="100" />
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex text-center fill-height columnaBotones"
        >
          <v-row no-gutters>
            <v-col cols="12" class="text-right divUser" no-gutters>
              <div class="divNombres">
                <span class="mb-0 username">
                  {{ this.getUsuario.username }}
                </span>
                <span class="nombreFinca">{{ this.getFinca.nombre }}</span>
                <!-- <v-btn class="ma-2" text icon color="blue lighten-2" @click="logout()">
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn> -->
              </div>
              <v-avatar size="36" class="mr-3">
                <img
                  class="mt-1"
                  :src="
                    'https://ui-avatars.com/api/?name=' +
                    this.getUsuario.username +
                    '&background=0D8ABC&color=fff'
                  "
                />
              </v-avatar>
            </v-col>
            <v-col cols="12" no-gutters>
              <ul class="contenedorListado">
                <li
                  v-for="(modulo, i) in getModulos"
                  :key="i"
                  @click="$router.push({ name: modulo.urlName })"
                  class="botonModulo"
                >
                  <div class="divIcon">
                    <v-icon medium color="white">{{ modulo.icon }}</v-icon>
                  </div>
                  <div class="divName">{{ modulo.caption }}</div>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "modules",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["resetState"]),
    logout() {
      this.resetState();
      this.$router.push({ name: "Login" });
    },
  },
  computed: {
    ...mapGetters(["getModulos", "getUsuario", "getFinca"]),
  },
};
</script>

<style scoped>
.bg {
  background: url("../assets/img/background.jpg") no-repeat center center;
  background-size: cover;
  background-color: rgb(255, 255, 255);
  transform: scale(1);
  overflow: hidden;
  border-right: 3px solid gray;
}
.botonModulo {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-decoration: none;
  width: 50%;
  background-color: var(--v-primary-base);
  padding: 8px;
  margin: 0px auto;
  color: white;
  border: 2px solid gray;
  font-size: 1rem;
  letter-spacing: 2px;
  margin-top: 6px;
  cursor: pointer;
  transition: 0.3s all;
  height: 60px;
  align-items: center;
}

.divIcon {
  width: 20%;
}
.divName {
  width: 80%;
}

.botonModulo:hover {
  width: 52%;
  background-color: var(--v-secondary-base);
  font-weight: bold;
}
.contenedorListado {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  align-self: center;
}
.columnaBotones {
  background: #333333;
}
.username {
  color: var(--v-accent-base);
  font-size: 1.5rem;
}
.nombreFinca {
  font-size: 1rem;
  font-weight: 700;
  color: var(--v-secondary-base);
}
.divNombres {
  display: flex;
  flex-direction: column;
  align-items: initial;
}
.divUser {
  display: flex;
  flex-direction: row-reverse;
}
</style>
