<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Registro de movimiento
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="pl-3">
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            :items="consumibles"
            :filter="customFilter"
            label="Consumible"
            return-object
            v-model="consumibleSeleted"
          >
            <template slot="item" slot-scope="{ item }"
              >{{ item.codigo }} - {{ item.medicina }}</template
            >
            <template slot="selection" slot-scope="{ item }"
              >{{ item.codigo }} - {{ item.medicina }}</template
            >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Unidad de medida"
            :value="consumibleSeleted ? consumibleSeleted.unidades : ''"
            hint="Unidades de medida"
            disabled
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Presentación"
            :value="consumibleSeleted ? consumibleSeleted.presentacion : ''"
            hint="Presentación del consumible"
            disabled
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Marca"
            :value="consumibleSeleted ? consumibleSeleted.marca : ''"
            hint="Marca del consumible"
            disabled
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :items="tipos_movimiento"
            label="Tipo de movimiento"
            item-value="id"
            v-model="consumoData.tipo_movimiento"
            hint="Indique el tipo de movimiento"
            persistent-hint
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Cantidad en movimiento"
            v-model="consumoData.cantidad_consumida"
            hint="Cantidad en movimiento"
            persistent-hint
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Cantidad en inventario"
            v-model="consumoData.cantidad_existente"
            hint="Cantidad que queda en existencia"
            persistent-hint
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Observaciones"
            v-model="consumoData.observaciones"
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
        @click="$router.push({ name: 'MovimientosConsumiblesList' })"
        >Cancelar</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import BotiquinService from "../../services/botiquin.service";
import ConsumosService from "../../services/consumos.service";
export default {
  name: "consumos-create",
  data() {
    return {
      botiquinService: null,
      consumosService: null,
      type: "create",
      consumibles: [],
      consumibleSeleted: null,
      tipos_movimiento: [
        {
          id: 0,
          text: "Salida",
        },
        {
          id: 1,
          text: "Entrada",
        },
      ],
      consumoData: {
        id: 0,
        consumible_id: null,
        cantidad_consumida: 0,
        cantidad_existente: 0,
        observaciones: "",
        tipo_movimiento: null,
      },
      animales: [],
    };
  },
  created() {
    this.consumosService = new ConsumosService();
    this.botiquinService = new BotiquinService();
  },
  mounted() {
    this.recuperarConsumibles();
    if (this.$route.params.id) {
      this.type = "edit";
      this.consumosService
        .getConsumoById(this.$route.params.id)
        .then((result) => {
          this.consumoData = result.data.data;
          this.consumoData["id"] = this.$route.params.id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    recuperarConsumibles() {
      this.botiquinService
        .getAllMedicinas()
        .then((result) => {
          this.consumibles = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async guardar() {
      let payload = null;
      if (this.type == "create") {
        this.consumoData.consumible_id = this.consumibleSeleted.id;
        await this.consumosService
          .createConsumo(this.consumoData)
          .then(() => {
            payload = {
              text: "Consumo guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            this.$router.push({ name: "MovimientosConsumiblesList" });
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
      const textUno = item.medicina.toLowerCase();
      const textDos = item.codigo.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textUno.indexOf(searchText) > -1 || textDos.indexOf(searchText) > -1
      );
    },
  },
};
</script>

<style scoped></style>