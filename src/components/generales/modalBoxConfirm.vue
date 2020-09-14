<template>
  <div>
    <v-dialog v-model="dialog" persistent :width="width" v-bind:style="{ zIndex: zIndex }">
      <v-card>
        <v-card-title>{{ titulo }}</v-card-title>
        <v-card-text id="cuerpoModalConfirm">
          <p>{{ mensaje }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="aceptar">Aceptar</v-btn>
          <v-btn color="error" @click="cancelar">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "modalBoxConfirm",
  data: () => ({
    dialog: false,
    width: 400,
    zIndex: 200,
    resolve: null,
    reject: null,
    titulo: "",
    mensaje: ""
  }),
  methods: {
    open(tituloModal, mensajeModal) {
      this.titulo = tituloModal;
      this.mensaje = mensajeModal;
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    aceptar() {
      this.resolve(true);
      this.dialog = false;
    },
    cancelar() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
</script>