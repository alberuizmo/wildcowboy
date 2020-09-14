<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped dark>
      <v-list dense>
        <v-list-item link @click="$router.push({ name: 'PotrerosList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-gate</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Potreros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'RolesList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-account-switch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Roles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'UsuariosList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'AnimalesList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-cow</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Animales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'ActividadesList' }).catch(() => {})">
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
        <v-list-item link @click="$router.push({ name: 'InseminacionesList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-reproduction</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inseminaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'CaloresList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-account-heart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Calores</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'PartosList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-mother-nurse</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Partos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'EnfermedadesList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-emoticon-sick</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Enfermedades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'BotiquinList' }).catch(() => {})">
          <v-list-item-action>
            <v-icon>mdi-pharmacy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Botiquin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item
          link
          @click="
            $router.push({ name: 'ControlFertilityMain' }).catch(() => {})
          "
          ><v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Control de Fertilidad</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <!--         <v-list-item link @click="$router.push({ name: 'RegisterBornMain' }).catch(() => {})">
          <v-list-item-content>
            <v-list-item-title>Registro Nacimiento</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="
            $router.push({ name: 'ControlFertilityMain' }).catch(() => {})
          "
        >
          <v-list-item-content>
            <v-list-item-title>Control de Fertilidad</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push({ name: 'MilkProductionMain' }).catch(() => {})">
          <v-list-item-content>
            <v-list-item-title>Producción Lechera</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <v-list-item link @click="$router.push({ name: 'Modules' }).catch(() => {})">
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
          <v-btn block @click="$router.push({ name: 'Login' }).catch(() => {})">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="../assets/img/circle-cropped.png" style="height:75%" class="mr-3" />
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
      WILD COWBOY
      <v-spacer></v-spacer>
      <span class="ml-3 white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-snackbar :color="color" v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-app>
</template>

<script>
import notificaciones from "./generales/notificaciones";
import { mapGetters } from "vuex";
export default {
  name: "mainlayout",
  components: { notificaciones },
  data: () => ({
    drawer: null,
    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 2000,
    color: "success",
  }),
  methods: {
    mostrarMensaje(evento) {
      this.text = evento.text;
      this.snackbar = evento.snackbar;
      this.color = evento.color;
    },
  },
  computed: {
    ...mapGetters(["getUsuario"]),
  },
};
</script>
