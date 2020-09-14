<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro rapido de producción lechera
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <qrcode-stream @decode="onDecode"></qrcode-stream>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Identificación"
            v-model="identificacion"
            hint="Escanee un código"
            persistent-hint
            :disabled="true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field label="Nombre" v-model="nombre" disabled></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Litros producidos"
            v-model="produccion_lechera.cantidad"
            hint="Ingrese los litro sde leche"
            persistent-hint
            ref="litrosInput"
            :loading="loading"
            :disabled="loading"
            @keypress.enter="guardarInformacion()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn
        color="primary"
        dark
        class="ml-3"
        @click="guardarInformacion()"
        :loading="loading"
        :disabled="loading"
      >Guardar</v-btn>
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({name:'ProduccionLecheraList'})"
      >Cancelar</v-btn>
    </v-col>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AnimalesService from "../../services/animales.service";
import ProduccionService from "../../services/produccion.service";
export default {
  name: "produccion-lechera-create-fast",
  data() {
    return {
      animalesService: null,
      produccionService: null,
      produccion_lechera: {
        id: 0,
        animal_id: null,
        fecha: null,
        hora: null,
        cantidad: null,
        semana_del_year: null,
        dia_de_la_semana: null,
        momento_del_dia: null,
        registro_manual: 1,
        observaciones: null,
        usuario_id: null,
        finca_id: null,
      },
      menu: false,
      menu2: false,
      animales: [],
      snack: false,
      snackColor: "",
      snackText: "",
      loading: false,
      nombre: "",
      identificacion: "",
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.produccionService = new ProduccionService();
  },
  mounted() {
    this.obtenerAnimales();
  },
  methods: {
    ...mapMutations([]),
    obtenerAnimales() {
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.animalesService
        .getAllAnimales(data)
        .then((result) => {
          this.animales = result.data.data.filter((item) => {
            return item.sexo == 0;
          });
          console.log(this.animales);
        })
        .catch(() => {});
    },
    onDecode(decodedString) {
      this.loading = true;
      let objectDecode = JSON.parse(JSON.parse(decodedString));
      this.identificacion = String(objectDecode.id);
      //buscar vaca y completar datos
      let vacas = this.animales.filter((vaca) => {
        return vaca.identificacion == this.identificacion;
      });
      if (vacas.length > 0) {
        this.nombre = vacas[0].nombre;
        this.produccion_lechera.animal_id = vacas[0].id;
      }
      this.$refs.litrosInput.focus();
      this.loading = false;
    },
    completarDatos() {
      let hora = this.$moment().format("HH:mm");
      this.produccion_lechera.dia_de_la_semana = this.$moment().weekday();
      this.produccion_lechera.fecha = this.$moment().format("YYYY-MM-DD");
      this.produccion_lechera.finca_id = this.getFinca.id;
      this.produccion_lechera.hora = hora;
      this.produccion_lechera.momento_del_dia =
        parseInt(hora.split(":")[0]) < 12 ? 0 : 1; // falta
      this.produccion_lechera.observaciones = "";
      this.produccion_lechera.registro_manual = 0;
      this.produccion_lechera.semana_del_year = this.$moment().week();
      this.produccion_lechera.usuario_id = this.getUsuario.id;
    },
    guardarInformacion() {
      this.loading = true;
      this.completarDatos();
      this.produccionService
        .createProduccion(this.produccion_lechera)
        .then((result) => {
          console.log(result);
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Data guardada";
          this.identificacion = "";
          this.nombre = "";
          this.produccion_lechera.cantidad = "";
          this.produccion_lechera.animal_id = null;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>