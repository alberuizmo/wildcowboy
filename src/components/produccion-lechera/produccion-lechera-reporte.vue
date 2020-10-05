<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="2" class="d-flex justify-center">
              <v-toolbar flat color="white">
                <v-toolbar-title>Reporte de producción</v-toolbar-title>
              </v-toolbar>
            </v-col>
            <v-col cols="12" sm="6" md="1" class="d-flex">
              <v-switch
                v-model="general"
                color="primary"
                class="mx-2"
                label="General"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="6" md="4" v-if="!general">
              <v-autocomplete
                v-model="animalesReport"
                :items="animales"
                chips
                small-chips
                label="Animales"
                item-text="nombre_id"
                multiple
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" :md="general ? 2 : 2">
              <v-menu
                v-model="menuDesde"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaDesde"
                    label="Desde"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hint="Fecha inicial"
                    persistent-hint
                  ></v-text-field>
                </template>
                <v-date-picker
                  :max="maxDate"
                  v-model="fechaDesde"
                  no-title
                  @input="menuDesde = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" :md="general ? 2 : 2">
              <v-menu
                v-model="menuHasta"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaHasta"
                    label="Hasta"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hint="Fecha final"
                    persistent-hint
                  ></v-text-field>
                </template>
                <v-date-picker
                  :max="maxDate"
                  v-model="fechaHasta"
                  no-title
                  @input="menuHasta = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="1" class="d-flex justify-center">
              <v-btn
                color="primary"
                dark
                class="ml-3"
                @click="armarDataLechera()"
                >Guardar</v-btn
              >
            </v-col>
          </v-row>
          <v-divider inset></v-divider>
          <v-row>
            <v-col cols="6">
              <v-simple-table
                v-if="general && produccionLechera.length > 0"
                dense
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Fecha</th>
                      <th class="text-left">Producción General (lts)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in produccionLechera" :key="index">
                      <td>{{ item.fecha }}</td>
                      <td>{{ item.produccion }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-simple-table
                v-if="!general && produccionLecheraDetalle.length > 0"
                dense
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Fecha</th>
                      <th
                        class="text-left"
                        v-for="(item, index) in animalesReport"
                        :key="index"
                      >
                        {{ item.nombre_id }} (lts)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in fechasFiltradas" :key="index">
                      <td>{{ item }}</td>
                      <td
                        v-for="(animal, index) in animalesReport"
                        :key="index"
                      >
                        {{ datoAnimal(item, animal.nombre_id) }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col cols="6" v-if="general && produccionLechera.length > 0">
              <apexchart
                type="line"
                :options="optionsGeneral"
                :series="seriesGeneral"
                height="500"
              ></apexchart
            ></v-col>
            <v-col
              cols="6"
              v-if="!general && produccionLecheraDetalle.length > 0"
            >
              <apexchart
                type="line"
                :options="optionsDetalle"
                :series="seriesDetalle"
                height="500"
              ></apexchart
            ></v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <modalconfirm ref="modalConfirm"></modalconfirm>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import modalconfirm from "../generales/modalBoxConfirm";
import { mapGetters, mapMutations } from "vuex";
import ProduccionService from "../../services/produccion.service";
import AnimalesService from "../../services/animales.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
  components: { modalconfirm },
  name: "produccion-lechera-grafico",
  data() {
    return {
      produccionService: null,
      animalesService: null,
      snack: false,
      snackColor: "",
      snackText: "",
      menuDesde: false,
      menuHasta: false,
      general: true,
      animalesReport: [],
      fechasFiltradas: [],
      animales: [],
      fechaDesde: null,
      fechaHasta: null,
      produccionLechera: [],
      produccionLecheraDetalle: [],
      maxDate: new Date().toISOString().slice(0, 10),
      optionsGeneral: {
        chart: {
          id: "produccionGeneral",
        },
        xaxis: {
          categories: [],
          tickAmount: 10,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          textAnchor: "middle",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
      },
      seriesGeneral: [
        {
          name: "Compuesto",
          data: [],
        },
      ],
      optionsDetalle: {
        chart: {
          id: "produccionDetalle",
        },
        xaxis: {
          categories: [],
          tickAmount: 10,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          textAnchor: "middle",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
      },
      seriesDetalle: [],
    };
  },
  created() {
    this.produccionService = new ProduccionService();
    this.animalesService = new AnimalesService();
  },
  mounted() {
    this.recuperarAnimales();
  },
  methods: {
    ...mapMutations(["deleteProductionData"]),
    recuperarAnimales() {
      this.animales.push({
        nombre: "Rosita",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Teresa",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Luisa",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Flor",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Florecita",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Furia",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Tota",
        identificacion: this.generarToken(),
      });
      this.animales.push({
        nombre: "Lola",
        identificacion: this.generarToken(),
      });
      this.animales = this.animales.map((item) => {
        item["nombre_id"] = `${item.identificacion} - ${item.nombre}`;
        return item;
      });
      /* this.animalesService
        .getAllAnimales()
        .then((result) => {
          this.animales = result.data.data.filter((item) => item.sexo == 0);
          this.animales = this.animales.map((item) => {
            item["nombre_id"] = `${item.identificacion}-${item.nombre}`;
            return item;
          });
        })
        .catch((err) => {
          console.log(err);
        }); */
    },
    customFilter(item, queryText) {
      const textUno = item.nombre.toLowerCase();
      const textDos = item.identificacion.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textUno.indexOf(searchText) > -1 || textDos.indexOf(searchText) > -1
      );
    },
    armarDataLechera() {
      let dataLechera = [];
      let fechaInicio = this.$moment(this.fechaDesde);
      let fechaFin = this.$moment(this.fechaHasta);
      if (!fechaInicio.isValid() || !fechaFin.isValid()) {
        this.snack = true;
        this.snackColor = "warning";
        this.snackText = "Fecha invalida";
        return false;
      }

      if (fechaInicio > fechaFin) {
        this.snack = true;
        this.snackColor = "warning";
        this.snackText = "La fecha inicio debe ser menor a la final";
        return false;
      }

      if (!this.general && this.animalesReport.length == 0) {
        this.snack = true;
        this.snackColor = "warning";
        this.snackText = "Debe seleccionar al menos un animal";
        return false;
      }

      if (fechaInicio.format("DD-MM-YYYY") == fechaFin.format("DD-MM-YYYY")) {
        if (this.general) {
          dataLechera.push({
            fecha: fechaInicio.format("DD-MM-YYYY"),
            produccion: this.numeroRandom(500, 600),
          });
        } else {
          for (let index = 0; index < this.animalesReport.length; index++) {
            const element = this.animalesReport[index];
            dataLechera.push({
              fecha: fechaInicio.format("DD-MM-YYYY"),
              produccion: this.numeroRandom(10, 30),
              animal: element.nombre_id,
            });
          }
        }
      } else {
        this.fechasFiltradas = [];
        do {
          this.fechasFiltradas.push(fechaInicio.format("DD-MM-YYYY"));
          if (this.general) {
            dataLechera.push({
              fecha: fechaInicio.format("DD-MM-YYYY"),
              produccion: this.numeroRandom(500, 600),
            });
          } else {
            for (let index = 0; index < this.animalesReport.length; index++) {
              const element = this.animalesReport[index];
              dataLechera.push({
                fecha: fechaInicio.format("DD-MM-YYYY"),
                produccion: this.numeroRandom(10, 30),
                animal: element.nombre_id,
              });
            }
          }
          fechaInicio = fechaInicio.add(1, "d");
        } while (fechaInicio <= fechaFin);
      }
      if (this.general) {
        this.produccionLechera = [...dataLechera];
        let dataLabels = this.produccionLechera.map((item) => {
          return item.fecha;
        });
        this.actualizarOpcionesGenerales(dataLabels);
        this.seriesGeneral = [
          {
            name: "General",
            data: [],
          },
        ];
        this.seriesGeneral[0].data = this.produccionLechera.map((item) => {
          return item.produccion;
        });
      } else {
        this.produccionLecheraDetalle = [...dataLechera];
        //obtener los label
        let dataLabels = this.produccionLecheraDetalle.map((item) => {
          return item.fecha;
        });
        //eliminar repetidos
        let labelSinRepetidos = [...new Set(dataLabels)];
        this.actualizarOpcionesDetalle(labelSinRepetidos);
        let series = [];
        for (let index = 0; index < this.animalesReport.length; index++) {
          const element = this.animalesReport[index];
          series.push({
            name: element.nombre_id,
            data: [],
          });
        }
        for (let index = 0; index < series.length; index++) {
          const element = series[index];
          //obtengo los datos del animal
          let datos = this.produccionLecheraDetalle.filter((item) => {
            return item.animal == element.name;
          });
          let soloProduccion = datos.map((item) => {
            return item.produccion;
          });
          series[index].data = soloProduccion;
        }
        this.seriesDetalle = series;
      }
    },
    actualizarOpcionesGenerales(labels) {
      this.optionsGeneral = {
        chart: {
          id: "produccionGeneral",
        },
        title: {
          text: "Producción general",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: undefined,
            color: "#939393",
          },
        },
        xaxis: {
          categories: labels,
          tickAmount: 10,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          textAnchor: "middle",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
      };
    },
    actualizarOpcionesDetalle(dataLabels) {
      this.optionsDetalle = {
        chart: {
          id: "produccionDetalle",
        },
        xaxis: {
          categories: dataLabels,
          tickAmount: 10,
        },
        title: {
          text: "Producción por animal",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: undefined,
            color: "#939393",
          },
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          textAnchor: "middle",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
      };
    },
    datoAnimal(fecha, nombre_id) {
      let data = this.produccionLecheraDetalle.filter((item) => {
        return item.fecha == fecha && item.animal == nombre_id;
      });
      return data.length > 0 ? data[0].produccion : 0;
    },
  },
  computed: {
    ...mapGetters([]),
  },
};
</script>

<style scoped>
.elegido {
  background-color: red;
}
</style>