<template>
  <div style="width: 100%">
    <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="valorCalendario"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
        @click:event="showEvent"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <p v-for="(item, index) in selectedEvent.details" :key="index">
              {{ item }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AnimalesService from "../../services/animales.service";
import PartosService from "../../services/partos.service";
import InseminacionesService from "../../services/inseminaciones.service";
import CaloresService from "../../services/calores.service";
import { Helpers } from "../../mixins/helpers";
export default {
  mixins: [Helpers],
  name: "actividades-list",
  data() {
    return {
      caloresService: null,
      animalesService: null,
      partosService: null,
      inseminacionesService: null,
      animales: [],
      partos: [],
      inseminaciones: [],
      calores: [],
      type: "month",
      types: ["month", "week", "day", "4day"],
      mode: "stack",
      weekday: [0, 1, 2, 3, 4, 5, 6],
      valorCalendario: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "Vacunación",
        "Inseminación",
        "Inspeccionar Terneros",
        "Chequeo de Calor",
      ],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      animalesIndexados: {},
      iniciando: true,
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.partosService = new PartosService();
    this.inseminacionesService = new InseminacionesService();
    this.caloresService = new CaloresService();
  },
  mounted() {
    /*this.obtenerAnimales();
    this.obtenerPartos();
    this.obtenerInseminaciones();
    this.obtenerCalores(); */
    this.valorCalendario = new Date();
    this.getActividadesMesTernero(
      this.$moment(this.valorCalendario).startOf("month").format("YYYY-MM-DD"),
      this.$moment(this.valorCalendario).endOf("month").format("YYYY-MM-DD")
    );
    this.getActividadesMesCheckeoCalores(
      this.$moment(this.valorCalendario).startOf("month").format("YYYY-MM-DD"),
      this.$moment(this.valorCalendario).endOf("month").format("YYYY-MM-DD")
    );
    this.getActividadesMesInseminadas(
      this.$moment(this.valorCalendario).startOf("month").format("YYYY-MM-DD"),
      this.$moment(this.valorCalendario).endOf("month").format("YYYY-MM-DD")
    );
    this.getTresFantasmas(
      this.$moment(this.valorCalendario).startOf("month").format("YYYY-MM-DD"),
      this.$moment(this.valorCalendario).endOf("month").format("YYYY-MM-DD")
    );
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
          for (let index = 0; index < this.animales.length; index++) {
            const element = this.animales[index];
            this.animalesIndexados[element.id] = element;
          }
          this.getActividadesMesTernero(
            this.$moment(this.valorCalendario)
              .startOf("month")
              .format("YYYY-MM-DD"),
            this.$moment(this.valorCalendario)
              .endOf("month")
              .format("YYYY-MM-DD")
          );
        })
        .catch(() => {});
    },
    obtenerPartos() {
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.partosService
        .getAllPartos(data)
        .then((result) => {
          this.partos = result.data.data;
          this.getActividadesMesCheckeoCalores(
            this.$moment(this.valorCalendario)
              .startOf("month")
              .format("YYYY-MM-DD"),
            this.$moment(this.valorCalendario)
              .endOf("month")
              .format("YYYY-MM-DD")
          );
        })
        .catch(() => {});
    },
    obtenerInseminaciones() {
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.inseminacionesService
        .getAllinseminaciones(data)
        .then((result) => {
          this.inseminaciones = result.data.data;
          this.getActividadesMesInseminadas(
            this.$moment(this.valorCalendario)
              .startOf("month")
              .format("YYYY-MM-DD"),
            this.$moment(this.valorCalendario)
              .endOf("month")
              .format("YYYY-MM-DD")
          );
        })
        .catch(() => {});
    },
    obtenerCalores() {
      let data = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
      };
      this.caloresService
        .getAllCalores(data)
        .then((result) => {
          this.calores = result.data.data;
          this.obtenerVisitaVeterinarioPostInseminacion(
            this.$moment(this.valorCalendario)
              .startOf("month")
              .format("YYYY-MM-DD"),
            this.$moment(this.valorCalendario)
              .endOf("month")
              .format("YYYY-MM-DD")
          );
        })
        .catch(() => {});
    },
    getActividadesMesTernero(inicio, fin) {
      let nombres = [
        "745864-Rosita",
        "745895-Toribio",
        "745236-Rosa",
        "745896-Lola",
        "951236-Tere",
      ];
      let fechaInicio = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      let events = [];
      for (let index = 0; index < 4; index++) {
        let fecha = this.$moment(
          this.fechaAleatoria(
            new Date(
              fechaInicio.year(),
              fechaInicio.get("month"),
              fechaInicio.get("date")
            ),
            new Date(
              fechaFin.year(),
              fechaFin.get("month"),
              fechaFin.get("date")
            )
          )
        );
        events.push({
          name: "Revisión Terneros",
          start: fecha.format("YYYY-MM-DD"),
          end: fecha.format("YYYY-MM-DD"),
          color: "blue",
          timed: false,
          details: [nombres[index]],
        });
      }
      this.events = this.events.concat(events);
      /* let events = [];
      let fechaAnalisis = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      do {
        let losDelDia = this.animales.filter((item) => {
          let fechaNacimiento = this.$moment(item.nacimiento);
          let years = this.$moment
            .duration(fechaAnalisis.diff(fechaNacimiento))
            .get("years");
          let meses = this.$moment
            .duration(fechaAnalisis.diff(fechaNacimiento))
            .get("months");
          let dias = this.$moment
            .duration(fechaAnalisis.diff(fechaNacimiento))
            .get("days");
          return years < 1 && meses <= 12 && dias == 0;
        });
        if (losDelDia.length > 0) {
          let nombres = losDelDia.map((item) => {
            return `${item.identificacion} - ${item.nombre}`;
          });
          events.push({
            name: "Revisión Terneros",
            start: fechaAnalisis.format("YYYY-MM-DD"),
            end: fechaAnalisis.format("YYYY-MM-DD"),
            color: "blue",
            timed: false,
            details: nombres,
          });
        }
        fechaAnalisis = fechaAnalisis.add(1, "d");
      } while (
        fechaAnalisis.format("DD-MM-YYYY") != fechaFin.format("DD-MM-YYYY")
      );
      this.events = this.events.concat(events);
      console.log(this.events); */
    },
    getActividadesMesCheckeoCalores(inicio, fin) {
      let nombres = [
        "741258-Lolita",
        "963258-Vaca Gorda",
        "412584-X53",
        "555652-Maria",
        "441258-Mami",
      ];
      let fechaInicio = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      let events = [];
      for (let index = 0; index < 4; index++) {
        let fecha = this.$moment(
          this.fechaAleatoria(
            new Date(
              fechaInicio.year(),
              fechaInicio.get("month"),
              fechaInicio.get("date")
            ),
            new Date(
              fechaFin.year(),
              fechaFin.get("month"),
              fechaFin.get("date")
            )
          )
        );
        events.push({
          name: "Calores post parto",
          start: fecha.format("YYYY-MM-DD"),
          end: fecha.format("YYYY-MM-DD"),
          color: "red",
          timed: false,
          details: [nombres[index]],
        });
      }
      this.events = this.events.concat(events);
      /* let events = [];
      let fechaAnalisis = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      do {
        let losDelDia = this.partos.filter((item) => {
          let fechaParto = this.$moment(item.fecha);
          let years = this.$moment
            .duration(fechaAnalisis.diff(fechaParto))
            .get("years");
          let meses = this.$moment
            .duration(fechaAnalisis.diff(fechaParto))
            .get("months");
          let dias = this.$moment
            .duration(fechaAnalisis.diff(fechaParto))
            .get("days");
          return years == 0 && meses == 0 && dias == 21;
        });
        if (losDelDia.length > 0) {
          let nombres = losDelDia.map((item) => {
            return `${item.identificacion_animal} - ${item.nombre_animal}`;
          });
          events.push({
            name: "Revisión calores post parto",
            start: fechaAnalisis.format("YYYY-MM-DD"),
            end: fechaAnalisis.format("YYYY-MM-DD"),
            color: "red",
            timed: false,
            details: nombres,
          });
        }
        fechaAnalisis = fechaAnalisis.add(1, "d");
      } while (
        fechaAnalisis.format("DD-MM-YYYY") != fechaFin.format("DD-MM-YYYY")
      );
      this.events = this.events.concat(events); */
    },
    getActividadesMesInseminadas(inicio, fin) {
      let nombres = [
        "741258-Lolita",
        "963258-Vaca Gorda",
        "412584-X53",
        "555652-Maria",
        "441258-Mamita",
      ];
      let fechaInicio = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      let events = [];
      for (let index = 0; index < 4; index++) {
        let fecha = this.$moment(
          this.fechaAleatoria(
            new Date(
              fechaInicio.year(),
              fechaInicio.get("month"),
              fechaInicio.get("date")
            ),
            new Date(
              fechaFin.year(),
              fechaFin.get("month"),
              fechaFin.get("date")
            )
          )
        );
        events.push({
          name: "Calores post inseminacion",
          start: fecha.format("YYYY-MM-DD"),
          end: fecha.format("YYYY-MM-DD"),
          color: "green",
          timed: false,
          details: [nombres[index]],
        });
        let fechaOchoMas = fecha.add(8, "d");
        events.push({
          name: "Ecografia",
          start: fechaOchoMas.format("YYYY-MM-DD"),
          end: fechaOchoMas.format("YYYY-MM-DD"),
          color: "orange",
          timed: false,
          details: [nombres[index]],
        });
      }
      this.events = this.events.concat(events);
      /* let events = [];
      let fechaAnalisis = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      do {
        let losDelDia = this.inseminaciones.filter((item) => {
          let fechaInseminacion = this.$moment(item.fecha);
          let years = this.$moment
            .duration(fechaAnalisis.diff(fechaInseminacion))
            .get("years");
          let meses = this.$moment
            .duration(fechaAnalisis.diff(fechaInseminacion))
            .get("months");
          let dias = this.$moment
            .duration(fechaAnalisis.diff(fechaInseminacion))
            .get("days");
          return years == 0 && meses == 0 && dias == 21;
        });
        if (losDelDia.length > 0) {
          let nombres = losDelDia.map((item) => {
            return `${item.identificacion_animal} - ${item.nombre_animal}`;
          });
          events.push({
            name: "Revisión calores post inseminacion",
            start: fechaAnalisis.format("YYYY-MM-DD"),
            end: fechaAnalisis.format("YYYY-MM-DD"),
            color: "green",
            timed: false,
            details: nombres,
          });
        }
        fechaAnalisis = fechaAnalisis.add(1, "d");
      } while (
        fechaAnalisis.format("DD-MM-YYYY") != fechaFin.format("DD-MM-YYYY")
      );
      this.events = this.events.concat(events); */
    },
    obtenerVisitaVeterinarioPostInseminacion(inicio, fin) {
      let events = [];
      let fechaAnalisis = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      do {
        let losDelDia = this.calores.filter((item) => {
          let fechaChequeoCalor = this.$moment(item.fecha);
          let years = this.$moment
            .duration(fechaAnalisis.diff(fechaChequeoCalor))
            .get("years");
          let meses = this.$moment
            .duration(fechaAnalisis.diff(fechaChequeoCalor))
            .get("months");
          let dias = this.$moment
            .duration(fechaAnalisis.diff(fechaChequeoCalor))
            .get("days");
          return (
            years == 0 &&
            meses == 0 &&
            dias == 9 &&
            item.post_inseminacion == 1 &&
            item.en_calor == 0
          );
        });
        if (losDelDia.length > 0) {
          let nombres = losDelDia.map((item) => {
            return `${item.identificacion_animal} - ${item.nombre_animal}`;
          });
          events.push({
            name: "Ecografía",
            start: fechaAnalisis.format("YYYY-MM-DD"),
            end: fechaAnalisis.format("YYYY-MM-DD"),
            color: "orange",
            timed: false,
            details: nombres,
          });
        }
        fechaAnalisis = fechaAnalisis.add(1, "d");
      } while (
        fechaAnalisis.format("DD-MM-YYYY") != fechaFin.format("DD-MM-YYYY")
      );
      this.events = this.events.concat(events);
    },
    getEvents({ start, end }) {
      if (this.iniciando == true) {
        this.iniciando = false;
        return false;
      }
      this.events = [];
      this.getActividadesMesTernero(start.date, end.date);
      this.getActividadesMesCheckeoCalores(start.date, end.date);
      this.getActividadesMesInseminadas(start.date, end.date);
      this.getTresFantasmas(start.date, end.date);
      /* this.obtenerVisitaVeterinarioPostInseminacion(start.date, end.date); */
    },
    recorrerFechas(inicio, fin) {
      let fechaInicio = this.$moment(inicio);
      let fechaFin = this.$moment(fin);
      do {
        fechaInicio = fechaInicio.add(1, "d");
        console.log(fechaInicio.format("DD-MM-YYYY"));
        console.log(fechaFin.format("DD-MM-YYYY"));
        if (fechaInicio.format("DD-MM-YYYY") == fechaFin.format("DD-MM-YYYY")) {
          console.log("IGUALES");
        }
      } while (
        fechaInicio.format("DD-MM-YYYY") != fechaFin.format("DD-MM-YYYY")
      );
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    getEventColor(event) {
      return event.color;
    },
    getTresFantasmas(inicio, fin) {
      let nombres = [
        "854123-Renata",
        "748596-Lechera",
        "362514-Mama Roja",
        "745832-La grande",
      ];
      let fechaInicio = this.$moment(inicio);
      let fechaFin = this.$moment(fin).add(1, "d");
      let events = [];
      for (let index = 0; index < 3; index++) {
        let fecha = this.$moment(
          this.fechaAleatoria(
            new Date(
              fechaInicio.year(),
              fechaInicio.get("month"),
              fechaInicio.get("date")
            ),
            new Date(
              fechaFin.year(),
              fechaFin.get("month"),
              fechaFin.get("date")
            )
          )
        );
        events.push({
          name: "Secado",
          start: fecha.format("YYYY-MM-DD"),
          end: fecha.format("YYYY-MM-DD"),
          color: "#770156",
          timed: false,
          details: [nombres[index]],
        });
        let lactancia = fecha.add(2, "days");
        events.push({
          name: "Preparación lactancia",
          start: lactancia.format("YYYY-MM-DD"),
          end: lactancia.add(4, "days").format("YYYY-MM-DD"),
          color: "#ed6a1a",
          timed: false,
          details: [nombres[index]],
        });
        let Parto = fecha.add(-1, "days");
        events.push({
          name: "Parto aproximado",
          start: Parto.format("YYYY-MM-DD"),
          end: Parto.format("YYYY-MM-DD"),
          color: "gray",
          timed: false,
          details: [nombres[index]],
        });
      }
      this.events = this.events.concat(events);
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
};
</script>

<style scoped></style>
