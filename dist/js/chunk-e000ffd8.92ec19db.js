(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e000ffd8"],{3597:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var i=a("d4ec"),n=a("bee2"),s=a("bc3a"),o=a.n(s),r=function(){function t(){Object(i["a"])(this,t)}return Object(n["a"])(t,[{key:"getAllAnimales",value:function(t){return o.a.post("https://veterinariaapi.herokuapp.com/api/animales/all/",t)}},{key:"createAnimal",value:function(t){return o.a.post("https://veterinariaapi.herokuapp.com/api/animales/",t)}},{key:"editAnimal",value:function(t){return o.a.put("https://veterinariaapi.herokuapp.com/api/animales/",t)}},{key:"getAnimalById",value:function(t){return o.a.get("https://veterinariaapi.herokuapp.com/api/animales/"+t)}},{key:"deleteAnimal",value:function(t){return o.a.delete("https://veterinariaapi.herokuapp.com/api/animales/"+t)}}]),t}()},"853c":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var i=a("d4ec"),n=a("bee2"),s=a("bc3a"),o=a.n(s),r=function(){function t(){Object(i["a"])(this,t)}return Object(n["a"])(t,[{key:"getAllCalores",value:function(t){return o.a.post("https://veterinariaapi.herokuapp.com/api/calores/all/",t)}},{key:"createCalor",value:function(t){return o.a.post("https://veterinariaapi.herokuapp.com/api/calores/",t)}},{key:"editCalor",value:function(t){return o.a.put("https://veterinariaapi.herokuapp.com/api/calores/",t)}},{key:"getCalorById",value:function(t){return o.a.get("https://veterinariaapi.herokuapp.com/api/calores/"+t)}},{key:"deleteCalor",value:function(t){return o.a.delete("https://veterinariaapi.herokuapp.com/api/calores/"+t)}}]),t}()},"9d01":function(t,e,a){},b73d:function(t,e,a){"use strict";a("0481"),a("4069");var i=a("5530"),n=(a("ec29"),a("9d01"),a("4de4"),a("45fc"),a("d3b7"),a("25f0"),a("c37a")),s=a("5607"),o=a("2b0e"),r=o["a"].extend({name:"rippleable",directives:{ripple:s["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}}),c=a("8547"),l=a("58df"),u=Object(l["a"])(n["a"],r,c["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,a=this.internalValue;return this.isMultiple?!!Array.isArray(a)&&a.some((function(a){return t.valueComparator(a,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,a):Boolean(a):this.valueComparator(a,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=this,e=n["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:function(e){e.preventDefault(),t.onChange()}},e):e},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,a=this.internalValue;if(this.isMultiple){Array.isArray(a)||(a=[]);var i=a.length;a=a.filter((function(a){return!t.valueComparator(a,e)})),a.length===i&&a.push(e)}else a=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(a,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(a,e)?null:e:!a;this.validate(!0,a),this.internalValue=a,this.hasColor=a}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),h=a("c3f0"),p=a("0789"),d=a("490a"),v=a("80d2");e["a"]=u.extend({name:"v-switch",directives:{Touch:h["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(i["a"])(Object(i["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(i["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(i["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(p["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(d["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===v["x"].left&&this.isActive||t.keyCode===v["x"].right&&!this.isActive)&&this.onChange()}}})},ec29:function(t,e,a){},f5f4:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",[a("v-col",{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Registro de calores "),a("hr")]),a("v-col",{attrs:{cols:"12"}},[a("v-row",{staticClass:"pl-3"},[a("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[a("v-autocomplete",{attrs:{items:t.animales.filter((function(t){return 0==t.sexo})),filter:t.customFilter,label:"Animal en calor","item-value":"id"},scopedSlots:t._u([{key:"item",fn:function(e){var a=e.item;return[t._v(t._s(a.identificacion)+" - "+t._s(a.nombre))]}},{key:"selection",fn:function(e){var a=e.item;return[t._v(t._s(a.identificacion)+" - "+t._s(a.nombre))]}}]),model:{value:t.calorData.animal_id,callback:function(e){t.$set(t.calorData,"animal_id",e)},expression:"calorData.animal_id"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[a("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,n=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:"Fecha","prepend-icon":"event",readonly:"",hint:"Seleccione la fecha","persistent-hint":""},model:{value:t.calorData.fecha,callback:function(e){t.$set(t.calorData,"fecha",e)},expression:"calorData.fecha"}},"v-text-field",n,!1),i))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{attrs:{max:t.maxDate,"no-title":""},on:{input:function(e){t.menu=!1}},model:{value:t.calorData.fecha,callback:function(e){t.$set(t.calorData,"fecha",e)},expression:"calorData.fecha"}})],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[a("v-switch",{staticClass:"mx-2",attrs:{color:"primary",label:"Esta en calor?"},model:{value:t.calorData.en_calor,callback:function(e){t.$set(t.calorData,"en_calor",e)},expression:"calorData.en_calor"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[a("v-switch",{staticClass:"mx-2",attrs:{color:"primary",label:"Post inseminación?"},model:{value:t.calorData.post_inseminacion,callback:function(e){t.$set(t.calorData,"post_inseminacion",e)},expression:"calorData.post_inseminacion"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[a("v-text-field",{attrs:{label:"Observaciones",hint:"Escribe tus observaciones","persistent-hint":""},model:{value:t.calorData.observaciones,callback:function(e){t.$set(t.calorData,"observaciones",e)},expression:"calorData.observaciones"}})],1)],1)],1),a("v-col",{attrs:{cols:"12"}},[a("v-btn",{staticClass:"ml-3",attrs:{color:"primary",dark:""},on:{click:function(e){return t.guardar()}}},[t._v("Guardar")]),a("v-btn",{staticClass:"ml-3",attrs:{color:"error",dark:""},on:{click:function(e){return t.$router.push({name:"CaloresList"})}}},[t._v("Cancelar")])],1)],1)},n=[],s=(a("c975"),a("fb6a"),a("96cf"),a("1da1")),o=a("5530"),r=a("2f62"),c=a("3597"),l=a("853c"),u={name:"calores-create",data:function(){return{maxDate:(new Date).toISOString().slice(0,10),animalesService:null,caloresService:null,type:"create",calorData:{id:0,animal_id:"",fecha:null,observaciones:"",en_calor:0,post_inseminacion:0,finca_id:null,usuario_id:null},menu:!1,animales:[]}},created:function(){this.animalesService=new c["a"],this.caloresService=new l["a"]},mounted:function(){var t=this;this.obtenerAnimales(),this.$route.params.id?(this.type="edit",this.caloresService.getCalorById(this.$route.params.id).then((function(e){t.calorData=e.data.data,t.calorData["id"]=t.$route.params.id,t.calorData["finca_id"]=t.getFinca.id,t.calorData["usuario_id"]=t.getUsuario.id,t.calorData["token"]=t.getToken})).catch((function(t){console.log(t)}))):(this.calorData["finca_id"]=this.getFinca.id,this.calorData["usuario_id"]=this.getUsuario.id,this.calorData["token"]=this.getToken)},methods:Object(o["a"])(Object(o["a"])({},Object(r["c"])([])),{},{obtenerAnimales:function(){var t=this,e={finca_id:this.getFinca.id,usuario_id:this.getUsuario.id,token:this.getToken};this.animalesService.getAllAnimales(e).then((function(e){t.animales=e.data.data})).catch((function(){}))},guardar:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=null,"create"!=t.type){e.next=6;break}return e.next=4,t.caloresService.createCalor(t.calorData).then((function(){a={text:"Registro guardado exitosamente",snackbar:!0,color:"success"},t.$emit("mostrarMensaje",a),t.$router.push({name:"CaloresList"})})).catch((function(t){console.log(t)}));case 4:e.next=7;break;case 6:a={text:"Registro editado exitosamente",snackbar:!0,color:"success"};case 7:case"end":return e.stop()}}),e)})))()},customFilter:function(t,e){var a=t.nombre.toLowerCase(),i=t.identificacion.toLowerCase(),n=e.toLowerCase();return a.indexOf(n)>-1||i.indexOf(n)>-1}}),computed:Object(o["a"])({},Object(r["b"])(["getFinca","getUsuario","getToken"]))},h=u,p=a("2877"),d=a("6544"),v=a.n(d),f=a("c6a6"),m=a("8336"),b=a("62ad"),g=a("2e4b"),k=a("e449"),C=a("0fd9"),y=a("b73d"),w=a("8654"),D=Object(p["a"])(h,i,n,!1,null,"51c070a8",null);e["default"]=D.exports;v()(D,{VAutocomplete:f["a"],VBtn:m["a"],VCol:b["a"],VDatePicker:g["a"],VMenu:k["a"],VRow:C["a"],VSwitch:y["a"],VTextField:w["a"]})}}]);
//# sourceMappingURL=chunk-e000ffd8.92ec19db.js.map