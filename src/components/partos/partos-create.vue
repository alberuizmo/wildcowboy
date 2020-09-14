<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro de partos
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            :items="animales.filter(item=>item.sexo==0)"
            :filter="customFilter"
            label="Animal"
            item-value="id"
            v-model="partoData.animal_id"
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
          <v-text-field
            type="number"
            label="Crias"
            v-model="partoData.hijos"
            hint="Cantidad de crias"
            persistent-hint
            min="1"
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
                v-model="partoData.fecha"
                label="Fecha"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                hint="Seleccione la fecha"
                persistent-hint
              ></v-text-field>
            </template>
            <v-date-picker :max="maxDate" v-model="partoData.fecha" no-title @input="menu = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="partoData.observaciones"
            hint="Escribe tus observaciones"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn color="error" dark class="ml-3" @click="$router.push({name:'PartosList'})">Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AnimalesService from "../../services/animales.service";
import PartosService from "../../services/partos.service";
export default {
  name: "partos-create",
  data() {
    return {
      maxDate: new Date().toISOString().slice(0, 10),
      animalesService: null,
      partosService: null,
      type: "create",
      partoData: {
        id: 0,
        animal_id: "",
        hijos: 1,
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
    this.partosService = new PartosService();
  },
  mounted() {
    this.obtenerAnimales();
    if (this.$route.params.id) {
      this.type = "edit";
      this.partosService
        .getPartoById(this.$route.params.id)
        .then((result) => {
          this.partoData = result.data.data;
          this.partoData["id"] = this.$route.params.id;
          this.partoData["finca_id"] = this.getFinca.id;
          this.partoData["usuario_id"] = this.getUsuario.id;
          this.partoData["token"] = this.getToken;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.partoData["finca_id"] = this.getFinca.id;
      this.partoData["usuario_id"] = this.getUsuario.id;
      this.partoData["token"] = this.getToken;
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
      if (this.type == "create") {
        await this.partosService
          .createParto(this.partoData)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            this.$router.push({ name: "PartosList" });
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
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>