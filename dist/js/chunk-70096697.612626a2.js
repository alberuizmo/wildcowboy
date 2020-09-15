(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70096697"],{3597:function(e,a,n){"use strict";n.d(a,"a",(function(){return r}));var i=n("d4ec"),t=n("bee2"),c=n("bc3a"),o=n.n(c),r=function(){function e(){Object(i["a"])(this,e)}return Object(t["a"])(e,[{key:"getAllAnimales",value:function(e){return o.a.post("https://veterinariaapi.herokuapp.com/api/animales/all/",e)}},{key:"createAnimal",value:function(e){return o.a.post("https://veterinariaapi.herokuapp.com/api/animales/",e)}},{key:"editAnimal",value:function(e){return o.a.put("https://veterinariaapi.herokuapp.com/api/animales/",e)}},{key:"getAnimalById",value:function(e){return o.a.get("https://veterinariaapi.herokuapp.com/api/animales/"+e)}},{key:"deleteAnimal",value:function(e){return o.a.delete("https://veterinariaapi.herokuapp.com/api/animales/"+e)}}]),e}()},a7dab:function(e,a,n){"use strict";n.r(a);var i=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("v-row",[n("v-col",{staticClass:"text-h5",attrs:{cols:"12"}},[e._v(" Registro rapido de producción lechera "),n("hr")]),n("v-col",{attrs:{cols:"12"}},[n("v-row",{staticClass:"pl-3"},[n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("qrcode-stream",{on:{decode:e.onDecode}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Identificación",hint:"Escanee un código","persistent-hint":"",disabled:!0},model:{value:e.identificacion,callback:function(a){e.identificacion=a},expression:"identificacion"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Nombre",disabled:""},model:{value:e.nombre,callback:function(a){e.nombre=a},expression:"nombre"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{ref:"litrosInput",attrs:{label:"Litros producidos",hint:"Ingrese los litro sde leche","persistent-hint":"",loading:e.loading,disabled:e.loading},on:{keypress:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.guardarInformacion()}},model:{value:e.produccion_lechera.cantidad,callback:function(a){e.$set(e.produccion_lechera,"cantidad",a)},expression:"produccion_lechera.cantidad"}})],1)],1)],1),n("v-col",{attrs:{cols:"12"}},[n("v-btn",{staticClass:"ml-3",attrs:{color:"primary",dark:"",loading:e.loading,disabled:e.loading},on:{click:function(a){return e.guardarInformacion()}}},[e._v("Guardar")]),n("v-btn",{staticClass:"ml-3",attrs:{color:"error",dark:""},on:{click:function(a){return e.$router.push({name:"ProduccionLecheraList"})}}},[e._v("Cancelar")])],1),n("v-snackbar",{attrs:{timeout:3e3,color:e.snackColor},scopedSlots:e._u([{key:"action",fn:function(a){var i=a.attrs;return[n("v-btn",e._b({attrs:{text:""},on:{click:function(a){e.snack=!1}}},"v-btn",i,!1),[e._v("Close")])]}}]),model:{value:e.snack,callback:function(a){e.snack=a},expression:"snack"}},[e._v(" "+e._s(e.snackText)+" ")])],1)},t=[],c=(n("4de4"),n("ac1f"),n("1276"),n("5530")),o=n("2f62"),r=n("3597"),l=n("b2d2"),s={name:"produccion-lechera-create-fast",data:function(){return{animalesService:null,produccionService:null,produccion_lechera:{id:0,animal_id:null,fecha:null,hora:null,cantidad:null,semana_del_year:null,dia_de_la_semana:null,momento_del_dia:null,registro_manual:1,observaciones:null,usuario_id:null,finca_id:null},menu:!1,menu2:!1,animales:[],snack:!1,snackColor:"",snackText:"",loading:!1,nombre:"",identificacion:""}},created:function(){this.animalesService=new r["a"],this.produccionService=new l["a"]},mounted:function(){this.obtenerAnimales()},methods:Object(c["a"])(Object(c["a"])({},Object(o["c"])([])),{},{obtenerAnimales:function(){var e=this,a={finca_id:this.getFinca.id,usuario_id:this.getUsuario.id,token:this.getToken};this.animalesService.getAllAnimales(a).then((function(a){e.animales=a.data.data.filter((function(e){return 0==e.sexo})),console.log(e.animales)})).catch((function(){}))},onDecode:function(e){var a=this;this.loading=!0;var n=JSON.parse(JSON.parse(e));this.identificacion=String(n.id);var i=this.animales.filter((function(e){return e.identificacion==a.identificacion}));i.length>0&&(this.nombre=i[0].nombre,this.produccion_lechera.animal_id=i[0].id),this.$refs.litrosInput.focus(),this.loading=!1},completarDatos:function(){var e=this.$moment().format("HH:mm");this.produccion_lechera.dia_de_la_semana=this.$moment().weekday(),this.produccion_lechera.fecha=this.$moment().format("YYYY-MM-DD"),this.produccion_lechera.finca_id=this.getFinca.id,this.produccion_lechera.hora=e,this.produccion_lechera.momento_del_dia=parseInt(e.split(":")[0])<12?0:1,this.produccion_lechera.observaciones="",this.produccion_lechera.registro_manual=0,this.produccion_lechera.semana_del_year=this.$moment().week(),this.produccion_lechera.usuario_id=this.getUsuario.id},guardarInformacion:function(){var e=this;this.loading=!0,this.completarDatos(),this.produccionService.createProduccion(this.produccion_lechera).then((function(a){console.log(a),e.snack=!0,e.snackColor="success",e.snackText="Data guardada",e.identificacion="",e.nombre="",e.produccion_lechera.cantidad="",e.produccion_lechera.animal_id=null,e.loading=!1})).catch((function(e){console.log(e)}))}}),computed:Object(c["a"])({},Object(o["b"])(["getFinca","getUsuario","getToken"]))},u=s,d=n("2877"),p=n("6544"),h=n.n(p),m=n("8336"),f=n("62ad"),v=n("0fd9"),k=n("2db4"),_=n("8654"),b=Object(d["a"])(u,i,t,!1,null,"03b144da",null);a["default"]=b.exports;h()(b,{VBtn:m["a"],VCol:f["a"],VRow:v["a"],VSnackbar:k["a"],VTextField:_["a"]})},b2d2:function(e,a,n){"use strict";n.d(a,"a",(function(){return r}));var i=n("d4ec"),t=n("bee2"),c=n("bc3a"),o=n.n(c),r=function(){function e(){Object(i["a"])(this,e)}return Object(t["a"])(e,[{key:"getProduccionPorFinca",value:function(e){return o.a.post("https://veterinariaapi.herokuapp.com/api/produccion_lechera/finca/",e)}},{key:"getProduccionPorSemana",value:function(e){return o.a.post("https://veterinariaapi.herokuapp.com/api/produccion_lechera/semana/",e)}},{key:"getProduccionPorAnimal",value:function(e){return o.a.post("https://veterinariaapi.herokuapp.com/api/produccion_lechera/animal/",e)}},{key:"createProduccion",value:function(e){return o.a.post("https://veterinariaapi.herokuapp.com/api/produccion_lechera/",e)}},{key:"editAnimal",value:function(e){return o.a.put("https://veterinariaapi.herokuapp.com/api/produccion_lechera/",e)}},{key:"getProduccionById",value:function(e){return o.a.get("https://veterinariaapi.herokuapp.com/api/produccion_lechera/"+e)}},{key:"deleteAnimal",value:function(e){return o.a.delete("https://veterinariaapi.herokuapp.com/api/produccion_lechera/"+e)}}]),e}()}}]);
//# sourceMappingURL=chunk-70096697.612626a2.js.map