<template>
  <v-row>
    <v-col cols="12" class="text-h5">
      Creación de animal
      <hr />
    </v-col>
    <v-row class="pl-3">
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Código"
          v-model="animal.codigo"
          hint="Ingresa el codigo del animal"
          persistent-hint
          :rules="[v => !!v || 'El campo es requerido']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Identificación"
          v-model="animal.identificacion"
          hint="Ingresa la identificación del animal"
          :rules="[v => !!v || 'El campo es requerido']"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Nombre"
          v-model="animal.nombre"
          hint="Ingresa el nombre del animal"
          :rules="[v => !!v || 'El campo es requerido']"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          :items="itemsProcedencia"
          label="Procedencia"
          v-model="animal.comprado"
          item-text="text"
          item-value="value"
          hint="Seleccion e la procedencia"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==0">
        <v-select
          :items="animales.filter(item=>item.sexo=='0')"
          label="Madre"
          v-model="animal.madre_id"
          item-text="nombre"
          item-value="id"
          hint="Seleccione la madre"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==0">
        <v-select
          :items="animales.filter(item=>item.sexo=='1')"
          label="Padre"
          v-model="animal.padre_id"
          item-text="nombre"
          item-value="id"
          hint="Seleccione el padre"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Identificación Padre"
          v-model="animal.padre_identificacion"
          hint="Ingresa la identificacion del padre"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Nombre Padre"
          v-model="animal.padre_nombre"
          hint="Ingresa el nombre del padre"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Identificación Madre"
          v-model="animal.madre_identificacion"
          hint="Ingresa la identificación de la madre"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Nombre Madre"
          v-model="animal.madre_nombre"
          hint="Ingresa el nombre de la madre"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Identificación Vendedor"
          v-model="animal.vendedor_identificacion"
          hint="Ingresa la identificación del vendedor"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Nombre Vendedor"
          v-model="animal.vendedor_nombre"
          hint="Ingresa el nombre del vendedor"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="animal.comprado==1">
        <v-text-field
          label="Teléfono Vendedor"
          v-model="animal.vendedor_telefono"
          hint="Ingresa el teléfono del vendedor"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="animal.nacimiento"
              label="Fecha de nacimiento"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
              hint="Seleccione la fecha de nacimiento"
              persistent-hint
            ></v-text-field>
          </template>
          <v-date-picker :max="maxDate" v-model="animal.nacimiento" no-title @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          :items="potreros"
          label="Potrero"
          v-model="animal.potrero_id"
          item-text="nombre"
          item-value="id"
          hint="Seleccione el potrero al que pertenece"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          :items="itemsSexo"
          label="Sexo"
          v-model="animal.sexo"
          item-text="text"
          item-value="value"
          hint="Seleccione el sexo"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Color" v-model="animal.color" hint="Color" persistent-hint></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Raza</th>
                <th class="text-left">Porcentaje %</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" v-model.trim="razaNueva" class="inputNuevo" />
                </td>
                <td>
                  <input type="number" v-model.trim="porcentajeNueva" class="inputNuevo" />
                </td>
                <td>
                  <v-icon @click="agregarFila()">mdi-content-save</v-icon>
                </td>
              </tr>
              <tr v-for="(raza,index) in porcentajeRazas" :key="index">
                <td>
                  <span>{{ raza.raza }}</span>
                </td>
                <td>{{ raza.porcentaje }}</td>
                <td>
                  <v-icon @click="eliminarFila(index)">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-col cols="12" sm="6" md="3">
      <v-btn color="primary" dark class="ml-3" @click="guardar()">Guardar</v-btn>
      <v-btn color="error" dark class="ml-3" @click="$router.push({name:'AnimalesList'})">Cancelar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import AnimalesService from "../../services/animales.service";
import PotrerosService from "../../services/potreros.service";
export default {
  name: "animales-create",
  data() {
    return {
      maxDate: new Date().toISOString().slice(0, 10),
      potrerosService: null,
      animalesService: null,
      itemsProcedencia: [
        { text: "Nacido", value: 0 },
        { text: "Comprado", value: 1 },
      ],
      itemsSexo: [
        {
          value: "1",
          text: "Macho",
        },
        {
          value: "0",
          text: "Hembra",
        },
      ],
      type: "create",
      menu: false,
      animales: [],
      potreros: [],
      animal: {
        id: 0,
        codigo: "",
        comprado: null,
        identificacion: null,
        madre_id: null,
        padre_id: null,
        nacimiento: null,
        nombre: "",
        potrero_id: null,
        sexo: null,
        padre_identificacion: null,
        padre_nombre: null,
        madre_identificacion: null,
        madre_nombre: null,
        vendedor_identificacion: null,
        vendedor_nombre: null,
        vendedor_telefono: null,
        color: null,
        razas: null,
      },
      porcentajeRazas: [],
      razaNueva: "",
      porcentajeNueva: 0,
    };
  },
  created() {
    this.animalesService = new AnimalesService();
    this.potrerosService = new PotrerosService();
  },
  mounted() {
    this.obtenerAnimales();
    this.recuperarPotreros();
    if (this.$route.params.id) {
      this.type = "edit";
      this.animalesService
        .getAnimalById(this.$route.params.id)
        .then((result) => {
          this.animal = result.data.data;
          this.porcentajeRazas =
            this.animal.razas == null ? [] : JSON.parse(this.animal.razas);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    eliminarFila(index) {
      this.porcentajeRazas.splice(index, 1);
    },
    agregarFila() {
      if (this.razaNueva == "" || this.porcentajeNueva <= 0) {
        return false;
      }
      this.porcentajeRazas.push({
        raza: this.razaNueva,
        porcentaje: this.porcentajeNueva,
      });
      this.razaNueva = "";
      this.porcentajeNueva = 0;
    },
    obtenerAnimales() {
      this.animalesService
        .getAllAnimales()
        .then((result) => {
          this.animales = result.data.data;
        })
        .catch(() => {});
    },
    recuperarPotreros() {
      this.potrerosService
        .getAllPotreros()
        .then((result) => {
          this.potreros = result.data.data;
        })
        .catch(() => {});
    },
    guardar() {
      this.animal.razas =
        this.porcentajeRazas.length == 0
          ? null
          : JSON.stringify(this.porcentajeRazas);
      let payload = null;
      if (this.type == "create") {
        //hacer peticion a servicio de creacion
        this.animalesService
          .createAnimal(this.animal)
          .then(() => {
            payload = {
              text: "Registro guardado exitosamente",
              snackbar: true,
              color: "success",
            };
            this.$emit("mostrarMensaje", payload);
            setTimeout(() => {
              this.$router.push({ name: "AnimalesList" });
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
          this.$router.push({ name: "AnimalesList" });
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.inputNuevo {
  width: 100%;
  height: 100%;
  padding-left: 10px;
}
</style>