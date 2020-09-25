<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Creación de inseminaciones
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            :items="animales.filter(item=>item.sexo==0)"
            :filter="customFilter"
            label="Animal Inseminado"
            item-value="id"
            v-model="inseminacionData.animal_id"
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
          <v-autocomplete
            :items="animales.filter(item=>item.sexo==1)"
            :filter="customFilterDonante"
            label="Reproductor"
            v-model="inseminacionData.animal_donante_id"
            item-value="id"
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
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-if="inseminacionData.animal_donante_id===undefined || inseminacionData.animal_donante_id===null"
        >
          <v-text-field
            label="Identificación del Donante"
            v-model="inseminacionData.donante_identificacion"
            hint="Identificación del donante"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-if="inseminacionData.animal_donante_id===undefined || inseminacionData.animal_donante_id===null"
        >
          <v-text-field
            label="Nombre del Donante"
            v-model="inseminacionData.donante_nombre"
            hint="Nombre del donante"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-switch
            v-model="inseminacionData.artificial"
            color="primary"
            class="mx-2"
            label="Inseminación Arficial?"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3" v-if="inseminacionData.artificial==1">
          <v-text-field
            label="Codigo de pajilla"
            v-model="inseminacionData.codigo_pajilla"
            hint="Codigo de pajilla"
            persistent-hint
          ></v-text-field>
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
                v-model="inseminacionData.fecha"
                label="Fecha"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                hint="Seleccione la fecha"
                persistent-hint
              ></v-text-field>
            </template>
            <v-date-picker
              :max="maxDate"
              v-model="inseminacionData.fecha"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="inseminacionData.observaciones"
            hint="Escribe tus observaciones"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({name:'InseminacionesList'})"
      >Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import AnimalesService from "../../services/animales.service";
import InseminacionesService from "../../services/inseminaciones.service";
export default {
  name: "inseminaciones-create",
  data() {
    return {
      maxDate: new Date().toISOString().slice(0, 10),
      animalesService: null,
      inseminacionesService: null,
      type: "create",
      inseminacionData: {
        id: 0,
        animal_id: "",
        animal_donante_id: null,
        donante_identificacion: null,
        donante_nombre: null,
        fecha: null,
        observaciones: "",
        codigo_pajilla: "",
        artificial: 0,
      },
      menu: false,
      animales: [],
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.inseminacionesService = new InseminacionesService();
  },
  mounted() {
    this.obtenerAnimales();
    if (this.$route.params.id) {
      this.type = "edit";
      this.inseminacionesService
        .getInseminacionById(this.$route.params.id)
        .then((result) => {
          this.inseminacionData = result.data.data;
          this.inseminacionData["id"] = this.$route.params.id;
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
      if (this.inseminacionData.animal_donante_id != undefined) {
        let animalDonante = this.animales.filter(
          (item) => item.id == this.inseminacionData.animal_donante_id
        );
        this.inseminacionData.donante_nombre = animalDonante[0].nombre;
        this.inseminacionData.donante_identificacion =
          animalDonante[0].identificacion;
      } else {
        this.inseminacionData.animal_donante_id = null;
      }

      if (this.type == "create") {
        await this.inseminacionesService
          .createInseminacion(this.inseminacionData)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            this.$router.push({ name: "InseminacionesList" });
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
    customFilterDonante(item, queryText) {
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