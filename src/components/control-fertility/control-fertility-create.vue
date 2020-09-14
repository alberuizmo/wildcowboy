<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Creación de control del fertilidad
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Nro Potrero"
            v-model="controlFertilityData.nro_potrero"
            hint="Ingresa el numero del potrero"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            :items="animales"
            :filter="customFilter"
            return-object
            label="Nro Animal"
            v-model="controlFertilityData.nro_animal"
          >
            <template slot="item" slot-scope="{ item }">{{ item.nro_animal }} - {{ item.name }}</template>
            <template slot="selection" slot-scope="{ item }">{{ item.nro_animal }} - {{ item.name }}</template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="controlFertilityData.f_entrada"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="controlFertilityData.f_entrada"
                label="Fecha de entrada"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                hint="Seleccione la fecha de entrada"
                persistent-hint
              ></v-text-field>
            </template>
            <v-date-picker v-model="controlFertilityData.f_entrada" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(controlFertilityData.f_entrada)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="controlFertilityData.f_salida"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="controlFertilityData.f_salida"
                label="Fecha de salida"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                hint="Seleccione la fecha de salida"
                persistent-hint
              ></v-text-field>
            </template>
            <v-date-picker v-model="controlFertilityData.f_salida" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(controlFertilityData.f_salida)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Producto"
            v-model="controlFertilityData.producto"
            hint="Escribe el producto"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Cantidad"
            v-model="controlFertilityData.cantidad"
            hint="Indique la cantidad"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="menu3"
            v-model="menu3"
            :close-on-content-click="false"
            :return-value.sync="controlFertilityData.f_fertilizacion"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="controlFertilityData.f_fertilizacion"
                label="Fecha de fertilización"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                hint="Seleccione la fecha de fertilización"
                persistent-hint
              ></v-text-field>
            </template>
            <v-date-picker v-model="controlFertilityData.f_fertilizacion" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu3.save(controlFertilityData.f_fertilizacion)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Dias de descanso"
            v-model="controlFertilityData.descanso"
            hint="Indique los dias de descanso"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="controlFertilityData.obs"
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
        @click="$router.push({name:'ControlFertilityList'})"
      >Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "control-fertility-create",
  data() {
    return {
      type: "create",
      controlFertilityData: {
        id: 0,
        nro_potrero: "",
        nro_animal: null,
        f_entrada: new Date().toISOString().substr(0, 10),
        f_salida: new Date().toISOString().substr(0, 10),
        producto: "",
        cantidad: "",
        f_fertilizacion: new Date().toISOString().substr(0, 10),
        descanso: 3,
        obs: "",
      },
      menu: false,
      menu2: false,
      menu3: false,
      animales: [],
    };
  },
  mounted() {
    this.animales = this.getListaAnimales;
    if (this.$route.params.id) {
      this.type = "edit";
      this.controlFertilityData = this.getFertilizacionDataById(
        this.$route.params.id
      );
    } else {
      this.controlFertilityData.id = this.generarToken();
    }
  },
  methods: {
    ...mapMutations(["pushFertilizacionData", "replaceFertilizacionData"]),
    guardar() {
      let payload = null;
      if (this.type == "create") {
        this.pushFertilizacionData(this.controlFertilityData);
        payload = {
          text: "Registro guardado exitosamente",
          snackbar: true,
          color: "success",
        };
      } else {
        this.replaceFertilizacionData(this.controlFertilityData);
        payload = {
          text: "Registro editado exitosamente",
          snackbar: true,
          color: "success",
        };
      }
      this.$emit("mostrarMensaje", payload);
      setTimeout(() => {
        this.$router.push({ name: "ControlFertilityList" });
      }, 2000);
    },
    customFilter(item, queryText) {
      const textUno = item.name.toLowerCase();
      const textDos = item.nro_animal.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textUno.indexOf(searchText) > -1 || textDos.indexOf(searchText) > -1
      );
    },
    generarToken() {
      return (
        Math.random().toString(36).substring(2, 13) +
        Math.random().toString(36).substring(2, 13)
      );
    },
  },
  computed: {
    ...mapGetters(["getListaAnimales", "getFertilizacionDataById"]),
  },
};
</script>

<style scoped></style>