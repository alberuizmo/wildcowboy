<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro de producción lechera
      <hr />
    </v-col>
    <v-row class="pl-3">
      <v-col cols="12" sm="6" md="3">
        <v-autocomplete
          :items="animales"
          :filter="customFilter"
          item-text="nombre"
          item-value="id"
          label="Animal"
          v-model="produccion_lechera.animal_id"
        >
          <template slot="item" slot-scope="{ item }">{{ item.identificacion }} - {{ item.nombre }}</template>
          <template
            slot="selection"
            slot-scope="{ item }"
          >{{ item.identificacion }} - {{ item.nombre }}</template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="produccion_lechera.fecha"
              label="Fecha"
              hint="Seleccione la fecha (MM/DD/YYYY)"
              persistent-hint
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :max="maxDate"
            v-model="produccion_lechera.fecha"
            no-title
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="produccion_lechera.hora"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="produccion_lechera.hora"
              label="Hora del ordeño"
              prepend-icon="access_time"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="produccion_lechera.hora"
            full-width
            @click:minute="$refs.menu2.save(produccion_lechera.hora)"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Cantidad"
          v-model="produccion_lechera.cantidad"
          hint="Indique la cantidad en litros"
          persistent-hint
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Observaciones"
          v-model="produccion_lechera.observaciones"
          hint="Indique si hay observaciones"
          persistent-hint
        ></v-text-field>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
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
  name: "produccion-lechera-create",
  data() {
    return {
      maxDate: new Date().toISOString().slice(0, 10),
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
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.produccionService = new ProduccionService();
  },
  mounted() {
    this.obtenerAnimales();
    if (this.$route.params.id) {
      this.type = "edit";
      this.produccionService
        .getProduccionById(this.$route.params.id)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.produccion_lechera.usuario_id = this.getUsuario.id;
      this.produccion_lechera.finca_id = this.getFinca.id;
    }
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
        })
        .catch(() => {});
    },
    guardar() {
      this.produccion_lechera.dia_de_la_semana = this.$moment(
        this.produccion_lechera.fecha
      ).weekday();
      this.produccion_lechera.semana_del_year = this.$moment(
        this.produccion_lechera.fecha
      ).week();
      let hora = this.produccion_lechera.hora.split(":")[0];
      this.produccion_lechera.momento_del_dia = parseInt(hora) < 12 ? 0 : 1;
      this.produccionService
        .createProduccion(this.produccion_lechera)
        .then((result) => {
          console.log(result);
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Data guardada";
          setTimeout(() => {
            this.$router.push({ name: "ProduccionLecheraList" });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    customFilter(item, queryText) {
      const textUno = item.nombre.toLowerCase();
      const textDos = item.identificacion.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textUno.indexOf(searchText) > -1 || textDos.indexOf(searchText) > -1
      );
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>