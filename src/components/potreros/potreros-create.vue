<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Creación de potreros
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Nombre"
            v-model="potreroData.nombre"
            hint="Ingresa el nombre del potrero"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Identificación"
            v-model="potreroData.identificacion"
            hint="Ingresa la identificación (codigo, abreviatura)"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({ name: 'PotrerosList' })"
      >Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { Helpers } from "../../mixins/helpers";
import PotrerosService from "../../services/potreros.service";
export default {
  mixins: [Helpers],
  name: "potrero-create",
  data() {
    return {
      potrerosService: null,
      type: "create",
      menu: false,
      potreroData: {
        id: 0,
        identificacion: null,
        nombre: "",
        finca_id: null,
        usuario_id: null,
      },
    };
  },
  created() {
    this.potrerosService = new PotrerosService();
  },
  mounted() {
    if (this.$route.params.id) {
      this.type = "edit";
      //si es edicion recuperar el potrero
      this.potrerosService
        .getPotreroById(this.$route.params.id)
        .then((result) => {
          this.potreroData.id = result.data.data.id;
          this.potreroData.identificacion = result.data.data.identificacion;
          this.potreroData.nombre = result.data.data.nombre;
          this.potreroData.this.potreroData.finca_id =
            result.data.data.finca_id;
          this.potreroData.usuario_id = this.getUsuario.id;
        })
        .catch(() => {});
    } else {
      this.potreroData.finca_id = this.getFinca.id;
      this.potreroData.usuario_id = this.getUsuario.id;
    }
  },
  methods: {
    ...mapMutations([]),
    guardar() {
      let payload = null;
      if (this.type == "create") {
        //hacer peticion a servicio de creacion
        this.potrerosService
          .createPotrero(this.potreroData)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            setTimeout(() => {
              this.$router.push({ name: "PotrerosList" });
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //hace rpeticion al servicio de edicion
        payload = {
          text: "Registro editado exitosamente",
          snackbar: true,
          color: "success",
        };
        this.$emit("mostrarMensaje", payload);
        setTimeout(() => {
          this.$router.push({ name: "PotrerosList" });
        }, 2000);
      }
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario"]),
  },
};
</script>

<style scoped></style>
