(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e45f723"],{"7dd5":function(e,a,n){"use strict";n.r(a);var i=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("v-row",[n("v-col",[n("v-card",[n("v-card-title",[n("div",{staticStyle:{width:"100%"}},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("Listado inseminaciones")]),n("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),n("v-spacer"),[n("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(a){return e.$router.push({name:"InseminacionesCreate"})}}},[e._v("Nuevo registro")])]],2)],1),n("div",{staticStyle:{width:"100%"}},[n("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(a){e.search=a},expression:"search"}})],1)]),n("v-data-table",{attrs:{headers:e.headers,items:e.inseminacionesData,search:e.search},scopedSlots:e._u([{key:"item.fecha",fn:function(a){var i=a.item;return[n("span",[e._v(e._s(e._f("formatear_fecha")(i.fecha)))])]}},{key:"item.actions",fn:function(a){var i=a.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return e.editItem(i)}}},[e._v("mdi-pencil")]),n("v-icon",{attrs:{small:""},on:{click:function(a){return e.deleteItem(i)}}},[e._v("mdi-delete")])]}}])})],1)],1),n("modalconfirm",{ref:"modalConfirm"})],1)},t=[],s=n("5530"),c=n("a7da"),o=n("2f62"),r=n("b83a"),l={components:{modalconfirm:c["a"]},name:"inseminaciones-list",data:function(){return{inseminacionesService:null,search:"",headers:[{text:"Animal Inseminado",value:"nombre_animal"},{text:"Animal Donante",value:"donante_nombre"},{text:"Fecha",value:"fecha"},{text:"Observaciones",value:"observaciones"},{text:"Actions",value:"actions",sortable:!1}],inseminacionesData:[]}},created:function(){this.inseminacionesService=new r["a"]},mounted:function(){this.recuperarInseminaciones()},methods:Object(s["a"])(Object(s["a"])({},Object(o["c"])(["deleteinseminacionesData"])),{},{recuperarInseminaciones:function(){var e=this,a={finca_id:this.getFinca.id,usuario_id:this.getUsuario.id,token:this.getToken};this.inseminacionesService.getAllinseminaciones(a).then((function(a){e.inseminacionesData=a.data.data})).catch((function(){}))},editItem:function(e){this.$router.push({name:"InseminacionesCreate",params:{id:e.id}})},deleteItem:function(e){var a=this,n="Eliminar registro",i="¿Desea eliminar el registro seleccionado?";this.$refs.modalConfirm.open(n,i).then((function(n){n&&a.deleteinseminacionesData(e)}))}}),computed:Object(s["a"])({},Object(o["b"])(["getFinca","getUsuario","getToken"]))},u=l,m=n("2877"),d=n("6544"),f=n.n(d),v=n("8336"),p=n("b0af"),h=n("99d9"),b=n("62ad"),k=n("8fea"),I=n("ce7e"),_=n("132d"),g=n("0fd9"),w=n("2fa4"),V=n("8654"),y=n("71d9"),x=n("2a7f"),C=Object(m["a"])(u,i,t,!1,null,"58f95ed2",null);a["default"]=C.exports;f()(C,{VBtn:v["a"],VCard:p["a"],VCardTitle:h["c"],VCol:b["a"],VDataTable:k["a"],VDivider:I["a"],VIcon:_["a"],VRow:g["a"],VSpacer:w["a"],VTextField:V["a"],VToolbar:y["a"],VToolbarTitle:x["a"]})},b83a:function(e,a,n){"use strict";n.d(a,"a",(function(){return o}));var i=n("d4ec"),t=n("bee2"),s=n("bc3a"),c=n.n(s),o=function(){function e(){Object(i["a"])(this,e)}return Object(t["a"])(e,[{key:"getAllinseminaciones",value:function(e){return c.a.post("https://veterinariaapi.herokuapp.com/api/inseminaciones/all/",e)}},{key:"createInseminacion",value:function(e){return c.a.post("https://veterinariaapi.herokuapp.com/api/inseminaciones/",e)}},{key:"getInseminacionById",value:function(e){return c.a.get("https://veterinariaapi.herokuapp.com/api/inseminaciones/"+e)}},{key:"editInseminacion",value:function(e){return c.a.put("https://veterinariaapi.herokuapp.com/api/inseminaciones/",e)}},{key:"deleteInseminacion",value:function(e){return c.a.delete("https://veterinariaapi.herokuapp.com/api/inseminaciones/"+e)}}]),e}()}}]);
//# sourceMappingURL=chunk-4e45f723.cef8e64f.js.map