<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped dark>
      <v-list dense>
        <v-list-item
          link
          @click="$router.push({ name: 'DashboardGanaderia' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'PotrerosList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-gate</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Potreros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'AnimalesList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-cow</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Animales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'ActividadesList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Actividades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="
            $router.push({ name: 'ProduccionLecheraList' }).catch(() => {})
          "
        >
          <v-list-item-action>
            <v-icon>mdi-beer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Producción lechera</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'InseminacionesList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-reproduction</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inseminaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'CaloresList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-account-heart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Calores</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'PartosList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-mother-nurse</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Partos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'EnfermedadesList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-emoticon-sick</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Enfermedades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'BotiquinList' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-rotate-right</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Consumibles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="
            $router.push({ name: 'MovimientosConsumiblesList' }).catch(() => {})
          "
        >
          <v-list-item-action>
            <v-icon>mdi-basket-minus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Movimiento Consumibles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Modules' }).catch(() => {})"
        >
          <v-list-item-action>
            <v-icon>mdi-arrow-left-bold-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Volver</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img
        src="../assets/img/circle-cropped.png"
        style="height: 75%"
        class="mr-3"
      />
      <v-toolbar-title>Ganadería</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar class="mr-3">
        <img
          :src="
            'https://ui-avatars.com/api/?name=' +
            this.getUsuario.username +
            '&background=0D8ABC&color=fff'
          "
        />
      </v-avatar>
      <notificaciones />
    </v-app-bar>
    <v-main>
      <v-container class="fill-height d-flex align-start" fluid>
        <router-view @mostrarMensaje="mostrarMensaje($event)"></router-view>
      </v-container>
    </v-main>
    <v-footer dark app>
      <span class="mr-1 white--text"
        >&copy; {{ new Date().getFullYear() }}</span
      >
      - WILD COWBOY
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            medium
            v-bind="attrs"
            v-on="on"
            color="primary"
            @click="logout()"
            >mdi-arrow-right-circle</v-icon
          >
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-footer>
    <v-snackbar :color="color" v-model="snackbar" :timeout="timeout">{{
      text
    }}</v-snackbar>
  </v-app>
</template>

<script>
import notificaciones from "./generales/notificaciones";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "mainlayout",
  components: { notificaciones },
  data: () => ({
    drawer: false,
    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 2000,
    color: "success",
  }),
  mounted() {
    setTimeout(() => {
      this.drawer = true;
    }, 100);
  },
  methods: {
    ...mapMutations(["resetState"]),
    mostrarMensaje(evento) {
      this.text = evento.text;
      this.snackbar = evento.snackbar;
      this.color = evento.color;
    },
    logout() {
      this.resetState();
      this.$router.push({ name: "Login" });
    },
  },
  computed: {
    ...mapGetters(["getUsuario"]),
  },
};
</script>
