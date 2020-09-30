<template>
  <v-row dense>
    <v-col cols="12" md="3" xl="2">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title>Medicinas en Alerta</v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Cantidad</th>
                <th class="text-left">Producto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(medicina, index) in medicinas" :key="index">
                <td>{{ medicina.cantidad }}</td>
                <td>{{ medicina.nombre }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" xl="6">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title style="height: 10%">Producción lechera</v-card-title>
        <apexchart
          type="bar"
          :options="options"
          :series="series"
          :height="heightGraficos"
        ></apexchart>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" xl="2">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title>Partos</v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Fecha</th>
                <th class="text-left">Animal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(parto, index) in partosDelMes" :key="index">
                <td>{{ formatFecha(parto.fecha) }}</td>
                <td>{{ parto.nombre_animal }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" xl="2">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title>Inseminaciones</v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Fecha</th>
                <th class="text-left">Animal</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(inseminacion, index) in inseminacionesDelMes"
                :key="index"
              >
                <td>{{ formatFecha(inseminacion.fecha) }}</td>
                <td>{{ inseminacion.nombre_animal }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" xl="2">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title>Prox. Fechas Veterinario</v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Fecha</th>
                <th class="text-left">Doctor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(visita, index) in proximasVisitasVeterinario"
                :key="index"
              >
                <td>{{ formatFecha(visita.fecha) }}</td>
                <td>{{ visita.nombre }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" xl="6">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title style="height: 10%">Consumo de Alimento</v-card-title>
        <apexchart
          type="line"
          :options="optionsAlimentos"
          :series="seriesAlimentos"
          :height="heightGraficos"
        ></apexchart>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="mx-auto" :height="heightDashboard">
        <v-card-title style="height: 10%">Razas en la finca</v-card-title>
        <apexchart
          type="donut"
          :options="optionsRazas"
          :series="seriesRazas"
          :height="heightGraficos"
        ></apexchart>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PartosService from "../services/partos.service";
import InseminacionesService from "../services/inseminaciones.service";
import { Helpers } from "../mixins/helpers";
export default {
  mixins: [Helpers],
  data() {
    return {
      partosService: null,
      InseminacionesService: null,
      heightDashboard: 300,
      heightGraficos: 250,
      partosDelMes: [],
      inseminacionesDelMes: [],
      medicinas: [],
      proximasVisitasVeterinario: [],
      optionsAlimentos: {
        chart: {
          id: "alimento",
        },
        xaxis: {
          categories: ["Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
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
      seriesAlimentos: [
        {
          name: "Compuesto",
          data: [6000, 8520, 10000, 10500, 9800, 6500, 10200, 16500],
        },
        {
          name: "Heno",
          data: [5600, 6000, 5900, 8500, 6500, 5500, 6450, 5800],
        },
      ],
      options: {
        chart: {
          id: "partos",
        },
        xaxis: {
          categories: ["Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
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
      series: [
        {
          name: "Litros",
          data: [
            586000,
            985000,
            687000,
            596000,
            875000,
            653000,
            456000,
            758000,
          ],
        },
      ],
      seriesRazas: [800, 600, 845, 500],
      optionsRazas: {
        labels: ["Holstein", "Pasiega", "Jersey", "Tudanca"],
        legend: {
          fontSize: "20px",
        },
      },
    };
  },
  created() {
    this.partosService = new PartosService();
    this.inseminacionesService = new InseminacionesService();
  },
  mounted() {
    this.recuperarPartos();
    this.recuperarInseminaciones();
    this.recuperarBotiquin();
    this.proximasVisitasVeterinarias();
  },
  methods: {
    proximasVisitasVeterinarias() {
      this.proximasVisitasVeterinario = [];
      this.proximasVisitasVeterinario.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 9, 1), new Date(2020, 10, 1)),
        nombre: "Dr. Felipe Rojas",
      });
      this.proximasVisitasVeterinario.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 9, 1), new Date(2020, 10, 1)),
        nombre: "Dra. Maria Lopera",
      });
      this.proximasVisitasVeterinario.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 9, 1), new Date(2020, 10, 1)),
        nombre: "Dra. Teresa Pomero",
      });
    },
    recuperarBotiquin() {
      this.medicinas = [];
      this.medicinas.push({
        id: this.generarToken(),
        cantidad: "30 pastillas",
        nombre: "Aspirina",
      });
      this.medicinas.push({
        id: this.generarToken(),
        cantidad: "10 litros",
        nombre: "Suero",
      });
      this.medicinas.push({
        id: this.generarToken(),
        cantidad: "2 Unidades",
        nombre: "Jeringas",
      });
      this.medicinas.push({
        id: this.generarToken(),
        cantidad: "3 botellas",
        nombre: "Metabol-cen",
      });
      this.medicinas.push({
        id: this.generarToken(),
        cantidad: "2 unidades",
        nombre: "Test-cen C.M.T.",
      });
    },
    recuperarInseminaciones() {
      this.inseminacionesDelMes = [];
      this.inseminacionesDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Lucia",
      });
      this.inseminacionesDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Teresa",
      });
      this.inseminacionesDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Maria",
      });
      this.inseminacionesDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Lola",
      });
      this.inseminacionesDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Tota",
      });
    },
    recuperarPartos() {
      this.partosDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Rosita",
      });
      this.partosDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Lolita",
      });
      this.partosDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Tota",
      });
      this.partosDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Flor",
      });
      this.partosDelMes.push({
        id: this.generarToken(),
        fecha: this.fechaAleatoria(new Date(2020, 8, 1), new Date()),
        nombre_animal: "Mu",
      });
      /* 
      this.partosDelMes = [];
      this.partosService
        .getAllPartos()
        .then((result) => {
          this.partosDelMes = result.data.data.filter((item) => {
            item.fecha = this.$moment(item.fecha).format("DD-MM-YYYY");
            return item;
          });
        })
        .catch((err) => {
          console.log(err);
        }); */
    },
  },
};
</script>
