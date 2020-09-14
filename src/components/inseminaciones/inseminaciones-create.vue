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
            label="Animal Donante"
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
import { mapGetters, mapMutations } from "vuex";
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
        finca_id: null,
        usuario_id: null,
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
          this.inseminacionData["finca_id"] = this.getFinca.id;
          this.inseminacionData["usuario_id"] = this.getUsuario.id;
          this.inseminacionData["token"] = this.getToken;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.inseminacionData["finca_id"] = this.getFinca.id;
      this.inseminacionData["usuario_id"] = this.getUsuario.id;
      this.inseminacionData["token"] = this.getToken;
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
        console.log(animalDonante);
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
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>