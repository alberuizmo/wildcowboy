<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <span class="bg"></span>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-card-text>
              <h1>Lo sentimos</h1>
              <h4>Pagina en contrucción</h4>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$router.go(-1)">Regresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "construction-page",
  props: {
    source: String,
  },
  data() {
    return {};
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
  background: url("../assets/img/background.jpg") no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}
</style>