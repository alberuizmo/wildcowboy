(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14a36dfb"],{"1f4f":function(e,t,a){"use strict";a("a9e3");var i=a("5530"),s=(a("8b37"),a("80d2")),r=a("7560"),n=a("58df");t["a"]=Object(n["a"])(r["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(i["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(s["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(e){return e("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"2e7b":function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var i=a("d4ec"),s=a("bee2"),r=a("bc3a"),n=a.n(r),o=function(){function e(){Object(i["a"])(this,e)}return Object(s["a"])(e,[{key:"getAllPartos",value:function(){return n.a.get("https://veterinariaapi.herokuapp.com/api/partos/")}},{key:"createParto",value:function(e){return n.a.post("https://veterinariaapi.herokuapp.com/api/partos/",e)}},{key:"editParto",value:function(e){return n.a.put("https://veterinariaapi.herokuapp.com/api/partos/",e)}},{key:"getPartoById",value:function(e){return n.a.get("https://veterinariaapi.herokuapp.com/api/partos/"+e)}},{key:"deleteParto",value:function(e){return n.a.delete("https://veterinariaapi.herokuapp.com/api/partos/"+e)}}]),e}()},"615b":function(e,t,a){},"8b37":function(e,t,a){},"99d9":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return c}));var i=a("b0af"),s=a("80d2"),r=Object(s["i"])("v-card__actions"),n=Object(s["i"])("v-card__subtitle"),o=Object(s["i"])("v-card__text"),c=Object(s["i"])("v-card__title");i["a"]},ad27:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",{attrs:{dense:""}},[a("v-col",{attrs:{cols:"12",md:"3",xl:"2"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",[e._v("Consumibles en Alerta")]),a("v-simple-table",{attrs:{dense:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("Cantidad")]),a("th",{staticClass:"text-left"},[e._v("Producto")])])]),a("tbody",e._l(e.medicinas,(function(t,i){return a("tr",{key:i},[a("td",[e._v(e._s(t.cantidad))]),a("td",[e._v(e._s(t.nombre))])])})),0)]},proxy:!0}])})],1)],1),a("v-col",{attrs:{cols:"12",md:"6",xl:"6"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",{staticStyle:{height:"10%"}},[e._v("Producción lechera")]),a("apexchart",{attrs:{type:"bar",options:e.options,series:e.series,height:e.heightGraficos}})],1)],1),a("v-col",{attrs:{cols:"12",md:"3",xl:"2"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",[e._v("Partos")]),a("v-simple-table",{attrs:{dense:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("Fecha")]),a("th",{staticClass:"text-left"},[e._v("Animal")])])]),a("tbody",e._l(e.partosDelMes,(function(t,i){return a("tr",{key:i},[a("td",[e._v(e._s(e.formatFecha(t.fecha)))]),a("td",[e._v(e._s(t.nombre_animal))])])})),0)]},proxy:!0}])})],1)],1),a("v-col",{attrs:{cols:"12",md:"3",xl:"2"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",[e._v("Inseminaciones")]),a("v-simple-table",{attrs:{dense:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("Fecha")]),a("th",{staticClass:"text-left"},[e._v("Animal")])])]),a("tbody",e._l(e.inseminacionesDelMes,(function(t,i){return a("tr",{key:i},[a("td",[e._v(e._s(e.formatFecha(t.fecha)))]),a("td",[e._v(e._s(t.nombre_animal))])])})),0)]},proxy:!0}])})],1)],1),a("v-col",{attrs:{cols:"12",md:"3",xl:"2"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",[e._v("Prox. Fechas Veterinario")]),a("v-simple-table",{attrs:{dense:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("Fecha")]),a("th",{staticClass:"text-left"},[e._v("Doctor")])])]),a("tbody",e._l(e.proximasVisitasVeterinario,(function(t,i){return a("tr",{key:i},[a("td",[e._v(e._s(e.formatFecha(t.fecha)))]),a("td",[e._v(e._s(t.nombre))])])})),0)]},proxy:!0}])})],1)],1),a("v-col",{attrs:{cols:"12",md:"6",xl:"6"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",{staticStyle:{height:"10%"}},[e._v("Consumo de Alimento")]),a("apexchart",{attrs:{type:"line",options:e.optionsAlimentos,series:e.seriesAlimentos,height:e.heightGraficos}})],1)],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-card",{staticClass:"mx-auto",attrs:{height:e.heightDashboard}},[a("v-card-title",{staticStyle:{height:"10%"}},[e._v("Razas en la finca")]),a("apexchart",{attrs:{type:"donut",options:e.optionsRazas,series:e.seriesRazas,height:e.heightGraficos}})],1)],1)],1)},s=[],r=a("2e7b"),n=a("b83a"),o=a("b132"),c={mixins:[o["a"]],data:function(){return{partosService:null,InseminacionesService:null,heightDashboard:300,heightGraficos:250,partosDelMes:[],inseminacionesDelMes:[],medicinas:[],proximasVisitasVeterinario:[],optionsAlimentos:{chart:{id:"alimento"},xaxis:{categories:["Feb","Mar","Abr","May","Jun","Jul","Ago","Sep"]},dataLabels:{enabled:!0,enabledOnSeries:void 0,textAnchor:"middle",distributed:!1,offsetX:0,offsetY:0,style:{fontSize:"12px",fontFamily:"Helvetica, Arial, sans-serif",fontWeight:"bold",colors:void 0},background:{enabled:!0,foreColor:"#fff",padding:4,borderRadius:2,borderWidth:1,borderColor:"#fff",opacity:.9,dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}},dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}}},seriesAlimentos:[{name:"Compuesto",data:[6e3,8520,1e4,10500,9800,6500,10200,16500]},{name:"Heno",data:[5600,6e3,5900,8500,6500,5500,6450,5800]}],options:{chart:{id:"partos"},xaxis:{categories:["Feb","Mar","Abr","May","Jun","Jul","Ago","Sep"]},dataLabels:{enabled:!0,enabledOnSeries:void 0,textAnchor:"middle",distributed:!1,offsetX:0,offsetY:0,style:{fontSize:"12px",fontFamily:"Helvetica, Arial, sans-serif",fontWeight:"bold",colors:void 0},background:{enabled:!0,foreColor:"#fff",padding:4,borderRadius:2,borderWidth:1,borderColor:"#fff",opacity:.9,dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}},dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}}},series:[{name:"Litros",data:[586e3,985e3,687e3,596e3,875e3,653e3,456e3,758e3]}],seriesRazas:[800,600,845,500],optionsRazas:{labels:["Holstein","Pasiega","Jersey","Tudanca"],legend:{fontSize:"20px"}}}},created:function(){this.partosService=new r["a"],this.inseminacionesService=new n["a"]},mounted:function(){this.recuperarPartos(),this.recuperarInseminaciones(),this.recuperarBotiquin(),this.proximasVisitasVeterinarias()},methods:{proximasVisitasVeterinarias:function(){this.proximasVisitasVeterinario=[],this.proximasVisitasVeterinario.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,9,1),new Date(2020,10,1)),nombre:"Dr. Felipe Rojas"}),this.proximasVisitasVeterinario.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,9,1),new Date(2020,10,1)),nombre:"Dra. Maria Lopera"}),this.proximasVisitasVeterinario.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,9,1),new Date(2020,10,1)),nombre:"Dra. Teresa Pomero"})},recuperarBotiquin:function(){this.medicinas=[],this.medicinas.push({id:this.generarToken(),cantidad:"30 pastillas",nombre:"Aspirina"}),this.medicinas.push({id:this.generarToken(),cantidad:"10 litros",nombre:"Suero"}),this.medicinas.push({id:this.generarToken(),cantidad:"2 Unidades",nombre:"Jeringas"}),this.medicinas.push({id:this.generarToken(),cantidad:"3 botellas",nombre:"Metabol-cen"}),this.medicinas.push({id:this.generarToken(),cantidad:"2 unidades",nombre:"Test-cen C.M.T."})},recuperarInseminaciones:function(){this.inseminacionesDelMes=[],this.inseminacionesDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Lucia"}),this.inseminacionesDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Teresa"}),this.inseminacionesDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Maria"}),this.inseminacionesDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Lola"}),this.inseminacionesDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Tota"})},recuperarPartos:function(){this.partosDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Rosita"}),this.partosDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Lolita"}),this.partosDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Tota"}),this.partosDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Flor"}),this.partosDelMes.push({id:this.generarToken(),fecha:this.fechaAleatoria(new Date(2020,8,1),new Date),nombre_animal:"Mu"})}}},l=c,h=a("2877"),d=a("6544"),u=a.n(d),p=a("b0af"),f=a("99d9"),m=a("62ad"),b=a("0fd9"),v=a("1f4f"),g=Object(h["a"])(l,i,s,!1,null,null,null);t["default"]=g.exports;u()(g,{VCard:p["a"],VCardTitle:f["c"],VCol:m["a"],VRow:b["a"],VSimpleTable:v["a"]})},b0af:function(e,t,a){"use strict";a("0481"),a("4069"),a("a9e3");var i=a("5530"),s=(a("615b"),a("10d2")),r=a("297c"),n=a("1c87"),o=a("58df");t["a"]=Object(o["a"])(r["a"],n["a"],s["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({"v-card":!0},n["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},s["a"].options.computed.classes.call(this))},styles:function(){var e=Object(i["a"])({},s["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=r["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var t=this.generateRouteLink(),a=t.tag,i=t.data;return i.style=this.styles,this.isClickable&&(i.attrs=i.attrs||{},i.attrs.tabindex=0),e(a,this.setBackgroundColor(this.color,i),[this.genProgress(),this.$slots.default])}})},b132:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a("7db0"),a("d3b7"),a("25f0");var i=a("07a4"),s={methods:{tienePermiso:function(e){return i["a"].getters.getPermisosDetallados.find((function(t){return t==e}))},colorAleatorio:function(){for(var e=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"),t="#",a=0;a<6;a++){var i=e.length-0,s=Math.random()*i;s=Math.floor(s);var r=parseInt(0)+s;t+=e[r]}return t},generarToken:function(){return Math.random().toString(36).substring(2,5)+Math.random().toString(36).substring(2,5)},formatFecha:function(e){return this.$moment(e).format("DD/MM/YYYY")},fechaAleatoria:function(e,t){var a=new Date(e.getTime()+Math.random()*(t.getTime()-e.getTime()));return a},numeroRandom:function(e,t){return Math.floor(Math.random()*(t-e))+e}}}},b83a:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var i=a("d4ec"),s=a("bee2"),r=a("bc3a"),n=a.n(r),o=function(){function e(){Object(i["a"])(this,e)}return Object(s["a"])(e,[{key:"getAllinseminaciones",value:function(e){return n.a.get("https://veterinariaapi.herokuapp.com/api/inseminaciones/",e)}},{key:"createInseminacion",value:function(e){return n.a.post("https://veterinariaapi.herokuapp.com/api/inseminaciones/",e)}},{key:"getInseminacionById",value:function(e){return n.a.get("https://veterinariaapi.herokuapp.com/api/inseminaciones/"+e)}},{key:"editInseminacion",value:function(e){return n.a.put("https://veterinariaapi.herokuapp.com/api/inseminaciones/",e)}},{key:"deleteInseminacion",value:function(e){return n.a.delete("https://veterinariaapi.herokuapp.com/api/inseminaciones/"+e)}}]),e}()}}]);
//# sourceMappingURL=chunk-14a36dfb.3752f888.js.map