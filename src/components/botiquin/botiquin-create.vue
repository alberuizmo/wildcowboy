<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro de medicamento
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Medicamento"
            v-model="medicamentoData.medicina"
            hint="Nombre de la medicina"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Cantidad"
            v-model="medicamentoData.cantidad"
            hint="Cantidad existente"
            persistent-hint
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Unidad de medida"
            v-model="medicamentoData.unidades"
            hint="Unidades de medida"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Presentación"
            v-model="medicamentoData.presentacion"
            hint="Presentación del medicamento"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Cantidad alerta"
            v-model="medicamentoData.alerta"
            hint="Cantidad de alerta"
            persistent-hint
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Marca"
            v-model="medicamentoData.marca"
            hint="Marca del medicamento"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="medicamentoData.observaciones"
            hint="Observaciones"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn color="error" dark class="ml-3" @click="$router.push({name:'BotiquinList'})">Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AnimalesService from "../../services/animales.service";
import BotiquinService from "../../services/botiquin.service";
export default {
  name: "botiquin-create",
  data() {
    return {
      animalesService: null,
      botiquinService: null,
      type: "create",
      medicamentoData: {
        id: 0,
        finca_id: null,
        medicina: null,
        cantidad: 0,
        unidades: null,
        presentacion: null,
        marca: null,
        alerta: 0,
        observaciones: "",
        usuario_id: null,
      },
      animales: [],
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.botiquinService = new BotiquinService();
  },
  mounted() {
    if (this.$route.params.id) {
      this.type = "edit";
      this.botiquinService
        .getMedicinaById(this.$route.params.id)
        .then((result) => {
          this.medicamentoData = result.data.data;
          this.medicamentoData["id"] = this.$route.params.id;
          this.medicamentoData["finca_id"] = this.getFinca.id;
          this.medicamentoData["usuario_id"] = this.getUsuario.id;
          this.medicamentoData["token"] = this.getToken;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.medicamentoData["finca_id"] = this.getFinca.id;
      this.medicamentoData["usuario_id"] = this.getUsuario.id;
      this.medicamentoData["token"] = this.getToken;
    }
  },
  methods: {
    ...mapMutations([]),
    async guardar() {
      let payload = null;
      if (this.type == "create") {
        await this.botiquinService
          .createMedicina(this.medicamentoData)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            this.$router.push({ name: "BotiquinList" });
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
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>