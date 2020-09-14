<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <div style="width:100%">
            <v-toolbar flat color="white">
              <v-toolbar-title>Control de producción lechera</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2 mr-2"
                  @click="$router.push({name:'ProduccionLecheraCreateFast'})"
                >Cargar Rapida</v-btn>
              </template>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push({name:'ProduccionLecheraCreate'})"
                >Nuevo registro</v-btn>
              </template>
            </v-toolbar>
          </div>
          <div style="width:100%">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </div>
          <div style="width:100%">
            <v-select
              :items="semanas"
              label="Semana"
              v-model="semanaSelected"
              item-text="text"
              return-object
              hint="Selecciona una semana"
              persistent-hint
              @change="cargarProduccion($event)"
            ></v-select>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="produccionLecheraFiltrada" :search="search">
          <template v-slot:header>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Lunes</th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Martes</th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Miercoles</th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Jueves</th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Viernes</th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Sabado</th>
                <th colspan="2" class="text-center" style="border:1px solid #dbdbdb">Domingo</th>
              </tr>
            </thead>
          </template>
          <template v-slot:item.dm="props" v-if="diaPermitido(6)">
            <v-edit-dialog
              :return-value.sync="props.item.dm"
              @save="save(props)"
              @cancel="cancel"
              @open="open('dm')"
              @close="close"
            >
              {{ props.item.dm }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.dm"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.dt="props" v-if="diaPermitido(6)">
            <v-edit-dialog
              :return-value.sync="props.item.dt"
              @save="save(props)"
              @cancel="cancel"
              @open="open('dt')"
              @close="close"
            >
              {{ props.item.dt }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.dt"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.lm="props" v-if="diaPermitido(0)">
            <v-edit-dialog
              :return-value.sync="props.item.lm"
              @save="save(props)"
              @cancel="cancel"
              @open="open('lm')"
              @close="close"
            >
              {{ props.item.lm }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.lm"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.lt="props" v-if="diaPermitido(0)">
            <v-edit-dialog
              :return-value.sync="props.item.lt"
              @save="save(props)"
              @cancel="cancel"
              @open="open('lt')"
              @close="close"
            >
              {{ props.item.lt }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.lt"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.mm="props" v-if="diaPermitido(1)">
            <v-edit-dialog
              :return-value.sync="props.item.mm"
              @save="save(props)"
              @cancel="cancel"
              @open="open('mm')"
              @close="close"
            >
              {{ props.item.mm }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.mm"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.mt="props" v-if="diaPermitido(1)">
            <v-edit-dialog
              :return-value.sync="props.item.mt"
              @save="save(props)"
              @cancel="cancel"
              @open="open('mt')"
              @close="close"
            >
              {{ props.item.mt }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.mt"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.mim="props" v-if="diaPermitido(2)">
            <v-edit-dialog
              :return-value.sync="props.item.mim"
              @save="save(props)"
              @cancel="cancel"
              @open="open('mim')"
              @close="close"
            >
              {{ props.item.mim }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.mim"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.mit="props" v-if="diaPermitido(2)">
            <v-edit-dialog
              :return-value.sync="props.item.mit"
              @save="save(props)"
              @cancel="cancel"
              @open="open('mit')"
              @close="close"
            >
              {{ props.item.mit }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.mit"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.jm="props" v-if="diaPermitido(3)">
            <v-edit-dialog
              :return-value.sync="props.item.jm"
              @save="save(props)"
              @cancel="cancel"
              @open="open('jm')"
              @close="close"
            >
              {{ props.item.jm }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.jm"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.jt="props" v-if="diaPermitido(3)">
            <v-edit-dialog
              :return-value.sync="props.item.jt"
              @save="save(props)"
              @cancel="cancel"
              @open="open('jt')"
              @close="close"
            >
              {{ props.item.jt }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.jt"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.vm="props" v-if="diaPermitido(4)">
            <v-edit-dialog
              :return-value.sync="props.item.vm"
              @save="save(props)"
              @cancel="cancel"
              @open="open('vm')"
              @close="close"
            >
              <span>{{ props.item.vm }}</span>
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.vm"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.vt="props" v-if="diaPermitido(4)">
            <v-edit-dialog
              :return-value.sync="props.item.vt"
              @save="save(props)"
              @cancel="cancel"
              @open="open('vt')"
              @close="close"
            >
              {{ props.item.vt }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.vt"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.sm="props" v-if="diaPermitido(5)">
            <v-edit-dialog
              :return-value.sync="props.item.sm"
              @save="save(props)"
              @cancel="cancel"
              @open="open('sm')"
              @close="close"
            >
              {{ props.item.sm }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.sm"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.st="props" v-if="diaPermitido(5)">
            <v-edit-dialog
              :return-value.sync="props.item.st"
              @save="save(props)"
              @cancel="cancel"
              @open="open('st')"
              @close="close"
            >
              {{ props.item.st }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.st"
                  :rules="[max3chars]"
                  label="Litros de leche"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <!-- <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="$router.push({name:'MilkProductionCreate'})"
            >mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>-->
        </v-data-table>
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
export default {
  components: { modalconfirm },
  name: "produccion-lechera-list",
  data() {
    return {
      produccionService: null,
      snack: false,
      snackColor: "",
      snackText: "",
      max3chars: (v) => v.length <= 3 || "Muy largo!",
      semanaSelected: null,
      semanas: [],
      search: "",
      headers: [
        { text: "Nro", value: "identificacion" },
        { text: "Nombre", value: "nombre" },
        { text: "M", value: "lm" },
        { text: "T", value: "lt" },
        { text: "M", value: "mm" },
        { text: "T", value: "mt" },
        { text: "M", value: "mim" },
        { text: "T", value: "mit" },
        { text: "M", value: "jm" },
        { text: "T", value: "jt" },
        { text: "M", value: "vm" },
        { text: "T", value: "vt" },
        { text: "M", value: "sm" },
        { text: "T", value: "st" },
        { text: "M", value: "dm" },
        { text: "T", value: "dt" },
        /* { text: "Actions", value: "actions", sortable: false }, */
      ],
      dataInitial: {
        animal_id: 0,
        identificacion: "",
        nombre: "",
        lm: 0,
        lt: 0,
        mm: 0,
        mt: 0,
        mim: 0,
        mit: 0,
        jm: 0,
        jt: 0,
        vm: 0,
        vt: 0,
        sm: 0,
        st: 0,
        dm: 0,
        dt: 0,
      },
      produccionLecheraFiltrada: [],
    };
  },
  created() {
    this.produccionService = new ProduccionService();
  },
  mounted() {
    this.cargarSemanas();
  },
  methods: {
    ...mapMutations(["deleteProductionData"]),
    cargarSemanas() {
      let semanaActualDelYear = this.$moment().week();
      for (let index = 1; index <= semanaActualDelYear; index++) {
        let semana = this.$moment().week(index);
        let inicioSemana = semana.startOf("week").format("DD/MM/YYYY");
        let finSemana = semana.endOf("week").format("DD/MM/YYYY");
        let data = {
          text: `Del ${inicioSemana} al ${finSemana}`,
          semana: index,
          inicio: semana.startOf("week").format("DD/MM/YYYY"),
          fin: semana.endOf("week").format("DD/MM/YYYY"),
        };
        this.semanas.push(data);
        this.semanaSelected = data;
      }
      this.cargarProduccion();
    },
    cargarProduccion() {
      let dataPeticion = {
        finca_id: this.getFinca.id,
        usuario_id: this.getUsuario.id,
        token: this.getToken,
        semana_del_year: this.semanaSelected.semana,
      };
      this.produccionService
        .getProduccionPorSemana(dataPeticion)
        .then((result) => {
          let listadoAnimales = [];
          for (let index = 0; index < result.data.data.length; index++) {
            const element = result.data.data[index];
            if (listadoAnimales.length == 0) {
              let dataNew = { ...this.dataInitial };
              dataNew.animal_id = element.animal_id;
              dataNew.identificacion = element.identificacion;
              dataNew.nombre = element.nombre;
              listadoAnimales.push(dataNew);
            } else {
              let buscar = listadoAnimales.filter((item) => {
                return item.animal_id == element.animal_id;
              });
              if (buscar.length == 0) {
                let dataNew = { ...this.dataInitial };
                dataNew.animal_id = element.animal_id;
                dataNew.identificacion = element.identificacion;
                dataNew.nombre = element.nombre;
                listadoAnimales.push(dataNew);
              }
            }
          }
          let diccionario = {
            0: "l",
            1: "m",
            2: "mi",
            3: "j",
            4: "v",
            5: "s",
            6: "d",
          };
          for (let index = 0; index < listadoAnimales.length; index++) {
            const element = listadoAnimales[index];
            let dataAnimal = result.data.data.filter((item) => {
              return item.animal_id == element.animal_id;
            });
            if (dataAnimal.length != 0) {
              for (let index2 = 0; index2 < dataAnimal.length; index2++) {
                const element2 = dataAnimal[index2];
                let momento = element2.momento_del_dia == 0 ? "m" : "t";
                listadoAnimales[index][
                  diccionario[String(element2.dia_de_la_semana)] + momento
                ] = element2.cantidad;
              }
            }
          }
          this.produccionLecheraFiltrada = listadoAnimales;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    activarEdicion(item) {
      console.log(item);
    },
    editItem(item) {
      console.log("editar", item);
    },
    deleteItem(item) {
      var tituloConfirm = "Eliminar registro";
      var mensajeConfirm = "¿Desea eliminar el registro seleccionado?";
      this.$refs.modalConfirm
        .open(tituloConfirm, mensajeConfirm)
        .then((result) => {
          if (result) {
            this.deleteProductionData(item);

            this.productionDataFiltered = this.getProductionData.filter(
              (item) => {
                return item.week.id == this.weekSelected.id;
              }
            );
          }
        });
    },
    save(props) {
      let produccion_lechera = {
        id: 0,
        animal_id: props.item.animal_id,
        fecha: this.$moment().format("YYYY-MM-DD"),
        hora: props.header.text == "M" ? "05:00" : "17:00",
        cantidad: props.value,
        semana_del_year: this.$moment().week(),
        dia_de_la_semana: this.$moment().weekday(),
        momento_del_dia: props.header.text == "M" ? 0 : 1,
        registro_manual: 1,
        observaciones: "",
        usuario_id: this.getUsuario.id,
        finca_id: this.getFinca.id,
      };
      this.produccionService
        .createProduccion(produccion_lechera)
        .then((result) => {
          console.log(result);
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Data guardada";
        })
        .catch((err) => {
          console.log(err);
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Error al guardar dato";
        });
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Acción cancelada";
    },
    open(diaMomento) {
      console.log(diaMomento);
    },
    close() {},
    diaPermitido(dia) {
      let resultado = false;
      if (this.semanaSelected) {
        let diaInicial = this.$moment(this.semanaSelected.inicio, "DD/MM/YYYY");
        let diaFinal = this.$moment(this.semanaSelected.fin, "DD/MM/YYYY");
        let hoy = this.$moment();
        if (
          hoy >= diaInicial &&
          hoy <= diaFinal &&
          dia == this.$moment().weekday()
        ) {
          resultado = true;
        }
      }
      return resultado;
    },
  },
  computed: {
    ...mapGetters(["getFinca", "getUsuario", "getToken"]),
  },
  watch: {
    semanaSelected(newValue) {
      if (newValue) {
        this.cargarProduccion();
      } else {
        this.produccionLecheraFiltrada = [];
      }
    },
  },
};
</script>

<style scoped>
.elegido {
  background-color: red;
}
</style>