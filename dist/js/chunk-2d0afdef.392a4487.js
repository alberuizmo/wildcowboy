(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0afdef"],{"0fbe":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",[a("v-col",[a("v-card",[a("v-card-title",[a("div",{staticStyle:{width:"100%"}},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[e._v("Listado de usuarios")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),[a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(t){return e.$router.push({name:"UsuariosCreate"})}}},[e._v("Nuevo usuario")])]],2)],1),a("div",{staticStyle:{width:"100%"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]),a("v-data-table",{attrs:{headers:e.headers,items:e.usuarios,search:e.search},scopedSlots:e._u([{key:"item.actions",fn:function(t){var i=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(i)}}},[e._v("mdi-pencil")]),a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(i)}}},[e._v("mdi-delete")])]}}])})],1)],1),a("modalconfirm",{ref:"modalConfirm"})],1)},r=[],s=a("5530"),o=a("2f62"),n=a("a7da"),c=a("e0c2"),l={components:{modalconfirm:n["a"]},name:"usuarios-list",data:function(){return{usersService:null,usuarios:[],search:"",headers:[{text:"Identificación",value:"identificacion"},{text:"Username",value:"username"},{text:"Nombre",value:"nombre"},{text:"Apellidos",value:"apellidos"},{text:"Telefono",value:"telefono"},{text:"Email",value:"email"},{text:"Actions",value:"actions",sortable:!1}]}},created:function(){this.usersService=new c["a"]},mounted:function(){this.recuperarUsuarios()},methods:Object(s["a"])(Object(s["a"])({},Object(o["c"])([])),{},{recuperarUsuarios:function(){var e=this,t={finca_id:this.getFinca.id,usuario_id:this.getUsuario.id,token:this.getToken};this.usersService.getAllUsers(t).then((function(t){e.usuarios=t.data.data,console.log(t)})).catch((function(){}))},editItem:function(e){this.$router.push({name:"UsuariosCreate",params:{id:e.id}})},deleteItem:function(){var e="Eliminar registro",t="¿Desea eliminar el rol seleccionado?";this.$refs.modalConfirm.open(e,t).then((function(e){}))}}),computed:Object(s["a"])({},Object(o["b"])(["getFinca","getUsuario","getToken"]))},u=l,d=a("2877"),f=a("6544"),m=a.n(f),v=a("8336"),h=a("b0af"),b=a("99d9"),p=a("62ad"),k=a("8fea"),w=a("ce7e"),x=a("132d"),V=a("0fd9"),g=a("2fa4"),C=a("8654"),T=a("71d9"),_=a("2a7f"),U=Object(d["a"])(u,i,r,!1,null,"3f83d184",null);t["default"]=U.exports;m()(U,{VBtn:v["a"],VCard:h["a"],VCardTitle:b["c"],VCol:p["a"],VDataTable:k["a"],VDivider:w["a"],VIcon:x["a"],VRow:V["a"],VSpacer:g["a"],VTextField:C["a"],VToolbar:T["a"],VToolbarTitle:_["a"]})}}]);
//# sourceMappingURL=chunk-2d0afdef.392a4487.js.map