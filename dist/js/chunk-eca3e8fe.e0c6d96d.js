(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eca3e8fe"],{"22fa":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-row",[t("v-col",[t("v-card",[t("v-card-title",[t("div",{staticStyle:{width:"100%"}},[t("v-toolbar",{attrs:{flat:"",color:"white"}},[t("v-toolbar-title",[e._v("Listado de enfermedades reportadas")]),t("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t("v-spacer"),[t("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(a){return e.$router.push({name:"EnfermedadesCreate"})}}},[e._v("Nuevo reporte")])]],2)],1),t("div",{staticStyle:{width:"100%"}},[t("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(a){e.search=a},expression:"search"}})],1)]),t("v-data-table",{attrs:{headers:e.headers,items:e.enfermedadesData,search:e.search},scopedSlots:e._u([{key:"item.fecha",fn:function(a){var r=a.item;return[t("span",[e._v(e._s(e._f("formatear_fecha")(r.fecha)))])]}},{key:"item.actions",fn:function(a){var r=a.item;return[t("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return e.editItem(r)}}},[e._v("mdi-pencil")]),t("v-icon",{attrs:{small:""},on:{click:function(a){return e.deleteItem(r)}}},[e._v("mdi-delete")])]}}])})],1)],1),t("modalconfirm",{ref:"modalConfirm"})],1)},n=[],i=t("5530"),d=t("a7da"),c=t("2f62"),s=t("4cb6"),o={components:{modalconfirm:d["a"]},name:"enfermedades-list",data:function(){return{enfermedadesService:null,search:"",headers:[{text:"Animal",value:"nombre_animal"},{text:"Enfermedad",value:"enfermedad"},{text:"Sintomas",value:"sintomas"},{text:"Fecha",value:"fecha"},{text:"Observaciones",value:"observaciones"},{text:"Actions",value:"actions",sortable:!1}],enfermedadesData:[]}},created:function(){this.enfermedadesService=new s["a"]},mounted:function(){this.recuperarEnfermedades()},methods:Object(i["a"])(Object(i["a"])({},Object(c["c"])([])),{},{recuperarEnfermedades:function(){var e=this,a={finca_id:this.getFinca.id,usuario_id:this.getUsuario.id,token:this.getToken};this.enfermedadesService.getAllEnfermedades(a).then((function(a){e.enfermedadesData=a.data.data})).catch((function(){}))},editItem:function(e){this.$router.push({name:"EnfermedadesCreate",params:{id:e.id}})},deleteItem:function(e){var a=this,t="Eliminar registro",r="¿Desea eliminar el registro seleccionado?";this.$refs.modalConfirm.open(t,r).then((function(t){t&&a.deleteenfermedadesData(e)}))}}),computed:Object(i["a"])({},Object(c["b"])(["getFinca","getUsuario","getToken"]))},l=o,u=t("2877"),f=t("6544"),m=t.n(f),p=t("8336"),v=t("b0af"),h=t("99d9"),b=t("62ad"),k=t("8fea"),_=t("ce7e"),g=t("132d"),E=t("0fd9"),w=t("2fa4"),V=t("8654"),x=t("71d9"),y=t("2a7f"),C=Object(u["a"])(l,r,n,!1,null,"a1eeeb2c",null);a["default"]=C.exports;m()(C,{VBtn:p["a"],VCard:v["a"],VCardTitle:h["c"],VCol:b["a"],VDataTable:k["a"],VDivider:_["a"],VIcon:g["a"],VRow:E["a"],VSpacer:w["a"],VTextField:V["a"],VToolbar:x["a"],VToolbarTitle:y["a"]})},"4cb6":function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var r=t("d4ec"),n=t("bee2"),i=t("bc3a"),d=t.n(i),c=function(){function e(){Object(r["a"])(this,e)}return Object(n["a"])(e,[{key:"getAllEnfermedades",value:function(e){return d.a.post("https://veterinariaapi.herokuapp.com/api/enfermedades/all/",e)}},{key:"createEnfermedad",value:function(e){return d.a.post("https://veterinariaapi.herokuapp.com/api/enfermedades/",e)}},{key:"editEnfermedad",value:function(e){return d.a.put("https://veterinariaapi.herokuapp.com/api/enfermedades/",e)}},{key:"getEnfermedadById",value:function(e){return d.a.get("https://veterinariaapi.herokuapp.com/api/enfermedades/"+e)}},{key:"deleteEnfermedad",value:function(e){return d.a.delete("https://veterinariaapi.herokuapp.com/api/enfermedades/"+e)}}]),e}()}}]);
//# sourceMappingURL=chunk-eca3e8fe.e0c6d96d.js.map