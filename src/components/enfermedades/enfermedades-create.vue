<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Reporte de enfermedades
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
            v-model="enfermedadData.animal_id"
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
            label="Enfermedad"
            v-model="enfermedadData.enfermedad"
            hint="Nombre de la enfermedad"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Sintomas"
            v-model="enfermedadData.sintomas"
            hint="Escribe los sintomas"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="enfermedadData.observaciones"
            hint="Escribe tus observaciones"
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
                v-model="enfermedadData.fecha"
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
              v-model="enfermedadData.fecha"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-switch v-model="notificar" color="primary" class="mx-2" label="Enviar Notificación"></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            label="Tratamiento"
            v-model="enfermedadData.tratamiento"
            hint="Tratamiento actual"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-row class="formulario">
          <v-col cols="12">Formulario de sintomatología</v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.come"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.come==0?'No ':'Si'} come`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.bebe"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.bebe==0?'No ':'Si'} bebe`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.camina"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.camina==0?'No ':'Si '}puede caminar`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.de_pie"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.de_pie==0?'No ':'Si '}se pone de pie`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.fiebre"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.fiebre==0?'No ':'Si '}tiene fiebre`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.defeca"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.defeca==0?'No ':'Si '}defeca`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.baja_produccion"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.baja_produccion==0?'Producción normal':'Baja producción'}`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.herida"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.herida==0?'No ':'Si '}presenta alguna herida`"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="enfermedadData.emergencia"
              color="primary"
              class="mx-2"
              :label="`${enfermedadData.emergencia==0?'No ':'Si '}es una emergencia?`"
            ></v-switch>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({name:'EnfermedadesList'})"
      >Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import AnimalesService from "../../services/animales.service";
import EnfermedadesService from "../../services/enfermedades.service";
export default {
  name: "enfermedades-create",
  data() {
    return {
      maxDate: new Date().toISOString().slice(0, 10),
      animalesService: null,
      enfermedadesService: null,
      type: "create",
      enfermedadData: {
        id: 0,
        animal_id: null,
        enfermedad: null,
        sintomas: null,
        fecha: null,
        observaciones: "",
        tratamiento: "",
        come: 0,
        bebe: 0,
        camina: 0,
        de_pie: 0,
        fiebre: 0,
        defeca: 0,
        baja_produccion: 0,
        herida: 0,
        emergencia: 0,
      },
      menu: false,
      animales: [],
      notificar: true,
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.enfermedadesService = new EnfermedadesService();
  },
  mounted() {
    this.obtenerAnimales();
    if (this.$route.params.id) {
      this.type = "edit";
      this.enfermedadesService
        .getEnfermedadById(this.$route.params.id)
        .then((result) => {
          this.enfermedadData = result.data.data;
          this.enfermedadData["id"] = this.$route.params.id;
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
        await this.enfermedadesService
          .createEnfermedad(this.enfermedadData)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            this.$router.push({ name: "EnfermedadesList" });
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

<style scoped>
.formulario {
  border: 1px solid gray;
  margin: 9px;
  border-radius: 13px;
  margin-top: 30px;
}
</style>