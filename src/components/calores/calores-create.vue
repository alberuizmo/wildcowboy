<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro de calores
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            :items="animales.filter(item=>item.sexo==0)"
            :filter="customFilter"
            label="Animal en calor"
            item-value="id"
            v-model="calorData.animal_id"
          >
            <template
              slot="item"
              slot-scope="{ item }"
            >{{ item.identificacion }} - {{ item.nombre }}</template>
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
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="calorData.fecha"
                label="Fecha"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                hint="Seleccione la fecha"
                persistent-hint
              ></v-text-field>
            </template>
            <v-date-picker :max="maxDate" v-model="calorData.fecha" no-title @input="menu = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-switch
            v-model="calorData.en_calor"
            color="primary"
            class="mx-2"
            label="Esta en calor?"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-switch
            v-model="calorData.post_inseminacion"
            color="primary"
            class="mx-2"
            label="Post inseminación?"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="calorData.observaciones"
            hint="Escribe tus observaciones"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn color="error" dark class="ml-3" @click="$router.push({name:'CaloresList'})">Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import AnimalesService from "../../services/animales.service";
import CaloresService from "../../services/calores.service";
export default {
  name: "calores-create",
  data() {
    return {
      maxDate: new Date().toISOString().slice(0, 10),
      animalesService: null,
      caloresService: null,
      type: "create",
      calorData: {
        id: 0,
        animal_id: "",
        fecha: null,
        observaciones: "",
        en_calor: 0,
        post_inseminacion: 0,
      },
      menu: false,
      animales: [],
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.caloresService = new CaloresService();
  },
  mounted() {
    this.obtenerAnimales();
    if (this.$route.params.id) {
      this.type = "edit";
      this.caloresService
        .getCalorById(this.$route.params.id)
        .then((result) => {
          this.calorData = result.data.data;
          this.calorData["id"] = this.$route.params.id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    obtenerAnimales() {
      this.animalesService
        .getAllAnimales()
        .then((result) => {
          this.animales = result.data.data;
        })
        .catch(() => {});
    },
    async guardar() {
      let payload = null;
      if (this.type == "create") {
        await this.caloresService
          .createCalor(this.calorData)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            this.$router.push({ name: "CaloresList" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        payload = {
          text: "Registro editado exitosamente",
          snackbar: true,
          color: "success",
        };
      }
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
};
</script>

<style scoped></style>