<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro de consumible
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Código"
            v-model="medicamentoData.codigo"
            hint="Código"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Consumible"
            v-model="medicamentoData.medicina"
            hint="Nombre del consumible"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Cantidad Inicial"
            v-model="medicamentoData.cantidad"
            hint="Cantidad inicial"
            persistent-hint
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :items="tipos_producto"
            label="Tipo de consumible"
            v-model="medicamentoData.tipo"
            hint="Seleccione el tipo de consumible"
            persistent-hint
          ></v-select>
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
            hint="Presentación del consumible"
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
            hint="Marca del consumible"
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
      <v-btn color="primary" dark class="ml-3" @click="guardar()"
        >Guardar</v-btn
      >
      <v-btn
        color="error"
        dark
        class="ml-3"
        @click="$router.push({ name: 'BotiquinList' })"
        >Cancelar</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import BotiquinService from "../../services/botiquin.service";
import ConsumosService from "../../services/consumos.service";
export default {
  name: "botiquin-create",
  data() {
    return {
      botiquinService: null,
      consumosService: null,
      type: "create",
      tipos_producto: ["Medicina", "Alimento", "Equipo Seguridad"],
      medicamentoData: {
        id: 0,
        codigo: null,
        medicina: null,
        cantidad: 0,
        unidades: null,
        presentacion: null,
        marca: null,
        alerta: 0,
        observaciones: "",
        tipo: null,
      },
      animales: [],
    };
  },
  created() {
    this.consumosService = new ConsumosService();
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    async guardar() {
      let payload = null;
      if (this.type == "create") {
        let nuevo_id = 0;
        await this.botiquinService
          .createMedicina(this.medicamentoData)
          .then((respuesta) => {
            nuevo_id = respuesta.data.id_creado;
          })
          .catch((err) => {
            console.log(err);
          });
        let dataConsumo = {
          consumible_id: nuevo_id,
          cantidad_consumida: 0,
          cantidad_existente: parseFloat(this.medicamentoData.cantidad),
          observaciones: "",
          tipo_movimiento: 1,
        };
        this.consumosService
          .createConsumo(dataConsumo)
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
        console.log(nuevo_id);
      } else {
        payload = {
          text: "Registro editado exitosamente",
          snackbar: true,
          color: "success",
        };
      }
    },
  },
};
</script>

<style scoped></style>