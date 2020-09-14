(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b225142"],{"1a70":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",[a("v-col",[a("v-card",[a("v-card-title",[a("div",{staticStyle:{width:"100%"}},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Listado de medicamentos en el botiquín")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),[a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.$router.push({name:"BotiquinCreate"})}}},[t._v("Nuevo reporte")])]],2)],1),a("div",{staticStyle:{width:"100%"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]),a("v-data-table",{attrs:{headers:t.headers,items:t.botiquinData,search:t.search},scopedSlots:t._u([{key:"item.cantidad",fn:function(e){var i=e.item;return[a("span",{class:{alert:i.cantidad<=i.alerta}},[t._v(t._s(i.cantidad))]),i.cantidad<=i.alerta?a("span",{staticClass:"alert ml-2"},[t._v("Alerta")]):t._e()]}},{key:"item.actions",fn:function(e){var i=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(i)}}},[t._v("mdi-pencil")]),a("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(i)}}},[t._v("mdi-delete")])]}}])})],1)],1),a("modalconfirm",{ref:"modalConfirm"})],1)},n=[],r=a("5530"),c=a("a7da"),o=a("2f62"),s=a("9255"),u={components:{modalconfirm:c["a"]},name:"botiquin-list",data:function(){return{botiquinService:null,search:"",headers:[{text:"Medicina",value:"medicina"},{text:"Cantidad",value:"cantidad"},{text:"Unidades",value:"unidades"},{text:"Presentación",value:"presentacion"},{text:"Marca",value:"marca"},{text:"Actions",value:"actions",sortable:!1}],botiquinData:[]}},created:function(){this.botiquinService=new s["a"]},mounted:function(){this.recuperarBotiquin()},methods:Object(r["a"])(Object(r["a"])({},Object(o["c"])([])),{},{recuperarBotiquin:function(){var t=this,e={finca_id:this.getFinca.id,usuario_id:this.getUsuario.id,token:this.getToken};this.botiquinService.getAllMedicinas(e).then((function(e){t.botiquinData=e.data.data})).catch((function(){}))},editItem:function(t){this.$router.push({name:"BotiquinCreate",params:{id:t.id}})},deleteItem:function(t){var e=this,a="Eliminar registro",i="¿Desea eliminar el registro seleccionado?";this.$refs.modalConfirm.open(a,i).then((function(a){a&&e.deletebotiquinData(t)}))}}),computed:Object(r["a"])({},Object(o["b"])(["getFinca","getUsuario","getToken"]))},d=u,l=(a("a38b"),a("2877")),p=a("6544"),v=a.n(p),f=a("8336"),m=a("b0af"),h=a("99d9"),b=a("62ad"),k=a("8fea"),q=a("ce7e"),g=a("132d"),_=a("0fd9"),w=a("2fa4"),C=a("8654"),V=a("71d9"),x=a("2a7f"),y=Object(l["a"])(d,i,n,!1,null,"d2fd1d30",null);e["default"]=y.exports;v()(y,{VBtn:f["a"],VCard:m["a"],VCardTitle:h["c"],VCol:b["a"],VDataTable:k["a"],VDivider:q["a"],VIcon:g["a"],VRow:_["a"],VSpacer:w["a"],VTextField:C["a"],VToolbar:V["a"],VToolbarTitle:x["a"]})},"774f":function(t,e,a){},9255:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var i=a("d4ec"),n=a("bee2"),r=a("bc3a"),c=a.n(r),o=function(){function t(){Object(i["a"])(this,t)}return Object(n["a"])(t,[{key:"getAllMedicinas",value:function(t){return c.a.post("https://veterinariaapi.herokuapp.com/api/botiquin/all/",t)}},{key:"createMedicina",value:function(t){return c.a.post("https://veterinariaapi.herokuapp.com/api/botiquin/",t)}},{key:"editMedicina",value:function(t){return c.a.put("https://veterinariaapi.herokuapp.com/api/botiquin/",t)}},{key:"getMedicinaById",value:function(t){return c.a.get("https://veterinariaapi.herokuapp.com/api/botiquin/"+t)}},{key:"deleteMedicina",value:function(t){return c.a.delete("https://veterinariaapi.herokuapp.com/api/botiquin/"+t)}}]),t}()},a38b:function(t,e,a){"use strict";var i=a("774f"),n=a.n(i);n.a}}]);
//# sourceMappingURL=chunk-4b225142.c4b14ad8.js.map