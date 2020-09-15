(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ec5d1152"],{b132:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("7db0"),r("d3b7"),r("25f0");var a=r("07a4"),o={methods:{tienePermiso:function(t){return a["a"].getters.getPermisosDetallados.find((function(e){return e==t}))},colorAleatorio:function(){for(var t=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"),e="#",r=0;r<6;r++){var a=t.length-0,o=Math.random()*a;o=Math.floor(o);var i=parseInt(0)+o;e+=t[i]}return e},generarToken:function(){return Math.random().toString(36).substring(2,13)+Math.random().toString(36).substring(2,13)}}}},e0b9:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",[r("v-col",{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Creación de potreros "),r("hr")]),r("v-col",{attrs:{cols:"12"}},[r("v-row",{staticClass:"pl-3"},[r("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[r("v-text-field",{attrs:{label:"Nombre",hint:"Ingresa el nombre del potrero","persistent-hint":""},model:{value:t.potreroData.nombre,callback:function(e){t.$set(t.potreroData,"nombre",e)},expression:"potreroData.nombre"}})],1),r("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[r("v-text-field",{attrs:{label:"Identificación",hint:"Ingresa la identificación (codigo, abreviatura)","persistent-hint":""},model:{value:t.potreroData.identificacion,callback:function(e){t.$set(t.potreroData,"identificacion",e)},expression:"potreroData.identificacion"}})],1)],1)],1),r("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[r("v-btn",{staticClass:"ml-3",attrs:{color:"primary",dark:""},on:{click:function(e){return t.guardar()}}},[t._v("Guardar")]),r("v-btn",{staticClass:"ml-3",attrs:{color:"error",dark:""},on:{click:function(e){return t.$router.push({name:"PotrerosList"})}}},[t._v("Cancelar")])],1)],1)},o=[],i=r("5530"),n=r("2f62"),s=r("b132"),c=r("fcd6"),u={mixins:[s["a"]],name:"potrero-create",data:function(){return{potrerosService:null,type:"create",menu:!1,potreroData:{id:0,identificacion:null,nombre:"",finca_id:null,usuario_id:null}}},created:function(){this.potrerosService=new c["a"]},mounted:function(){var t=this;this.$route.params.id?(this.type="edit",this.potrerosService.getPotreroById(this.$route.params.id).then((function(e){t.potreroData.id=e.data.data.id,t.potreroData.identificacion=e.data.data.identificacion,t.potreroData.nombre=e.data.data.nombre,t.potreroData.this.potreroData.finca_id=e.data.data.finca_id,t.potreroData.usuario_id=t.getUsuario.id})).catch((function(){}))):(this.potreroData.finca_id=this.getFinca.id,this.potreroData.usuario_id=this.getUsuario.id)},methods:Object(i["a"])(Object(i["a"])({},Object(n["c"])([])),{},{guardar:function(){var t=this,e=null;"create"==this.type?this.potrerosService.createPotrero(this.potreroData).then((function(){e={text:"Registro guardado exitosamente",snackbar:!0,color:"success"},t.$emit("mostrarMensaje",e),setTimeout((function(){t.$router.push({name:"PotrerosList"})}),2e3)})).catch((function(t){console.log(t)})):(e={text:"Registro editado exitosamente",snackbar:!0,color:"success"},this.$emit("mostrarMensaje",e),setTimeout((function(){t.$router.push({name:"PotrerosList"})}),2e3))}}),computed:Object(i["a"])({},Object(n["b"])(["getFinca","getUsuario"]))},d=u,l=r("2877"),p=r("6544"),f=r.n(p),h=r("8336"),m=r("62ad"),v=r("0fd9"),b=r("8654"),g=Object(l["a"])(d,a,o,!1,null,"580c7980",null);e["default"]=g.exports;f()(g,{VBtn:h["a"],VCol:m["a"],VRow:v["a"],VTextField:b["a"]})},fcd6:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var a=r("d4ec"),o=r("bee2"),i=r("bc3a"),n=r.n(i),s=function(){function t(){Object(a["a"])(this,t)}return Object(o["a"])(t,[{key:"getAllPotreros",value:function(t){return n.a.post("https://veterinariaapi.herokuapp.com/api/potreros/all/",t)}},{key:"createPotrero",value:function(t){return n.a.post("https://veterinariaapi.herokuapp.com/api/potreros/",t)}},{key:"editPotrero",value:function(t){return n.a.put("https://veterinariaapi.herokuapp.com/api/potreros/",t)}},{key:"getPotreroById",value:function(t){return n.a.get("https://veterinariaapi.herokuapp.com/api/potreros/"+t)}},{key:"deletePotrero",value:function(t){return n.a.delete("https://veterinariaapi.herokuapp.com/api/potreros/"+t)}}]),t}()}}]);
//# sourceMappingURL=chunk-ec5d1152.d9234402.js.map