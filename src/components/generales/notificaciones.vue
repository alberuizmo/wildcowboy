<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-bottom="10" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-badge :content="conteo" :value="conteo" color="green" overlap>
        <v-icon medium v-bind="attrs" v-on="on">mdi-email</v-icon>
      </v-badge>
    </template>
    <v-card>
      <!-- <v-list>
          <v-list-item v-for="(evento,index) in eventsServi" :key="index" class="pa-0">
            <v-list-item-avatar class="pa-0">
              <v-icon
                :color="evento.status"
              >{{evento.status=='success'?'mdi-checkbox-marked-circle':'mdi-close-circle'}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-title class="pa-0">{{diccionario(evento.event_type)}}</v-list-item-title>
              <v-list-item-subtitle class="pa-0">
                {{evento.mensaje}}
                <span>- {{formatFecha(evento.date)}}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="pa-0">
              <v-btn class="red--text" icon @click="eliminarEvento(evento.key)">
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
      </v-list>-->
      <v-list v-if="conteo==0">
        <v-list-item>
          <v-list-item-content class="pa-0">No hay notificaciones</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="menu = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "notificaciones",
  data() {
    return {
      menu: false,
      conteo: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations([]),
  },
  computed: {
    ...mapGetters([]),
  },
};
</script>
