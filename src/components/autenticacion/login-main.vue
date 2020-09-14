<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <span class="bg"></span>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          :md="componentId == 'registrocomponent' ? 10 : 6"
          color="primary"
          style="z-index:99999"
        >
          <v-card
            class="elevation-12"
            :height="componentId == 'registrocomponent' ? 550 : 400"
          >
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Wild Cowboy</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <component
              :is="componentId"
              @cambiar="cambiarComponente($event)"
            ></component>
          </v-card>
          <v-card
            class="elevation-12 mt-6"
            v-if="componentId != 'registrocomponent'"
          >
            <v-card-text class="text-center">
              <img
                src="../../assets/img/instagram.svg"
                height="36"
                class="ml-3"
              />
              <img
                src="../../assets/img/facebook.svg"
                height="36"
                class="ml-3"
              />
              <img
                src="../../assets/img/linkedin.svg"
                height="36"
                class="ml-3"
              />
              <img src="../../assets/img/email.svg" height="36" class="ml-3" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import logincomponent from "./login";
import registrocomponent from "./registro";

export default {
  name: "main-login",
  components: { logincomponent, registrocomponent },
  data() {
    return {
      componentId: "logincomponent",
    };
  },
  methods: {
    cambiarComponente(evento) {
      this.componentId = evento;
    },
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/img/background.jpg") no-repeat center center;
  background-size: cover;
  background-color: white;
  transform: scale(1.1);
}
</style>
