(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20441a06"],{"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("d3b7");function r(t,e,n,r,a,i,o){try{var c=t[i](o),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var o=t.apply(e,n);function c(t){r(o,a,i,c,s,"next",t)}function s(t){r(o,a,i,c,s,"throw",t)}c(void 0)}))}}},3597:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("d4ec"),a=n("bee2"),i=n("bc3a"),o=n.n(i),c=function(){function t(){Object(r["a"])(this,t)}return Object(a["a"])(t,[{key:"getAllAnimales",value:function(t){return o.a.get("https://veterinariaapi.herokuapp.com/api/animales/",t)}},{key:"createAnimal",value:function(t){return o.a.post("https://veterinariaapi.herokuapp.com/api/animales/",t)}},{key:"editAnimal",value:function(t){return o.a.put("https://veterinariaapi.herokuapp.com/api/animales/",t)}},{key:"getAnimalById",value:function(t){return o.a.get("https://veterinariaapi.herokuapp.com/api/animales/"+t)}},{key:"deleteAnimal",value:function(t){return o.a.delete("https://veterinariaapi.herokuapp.com/api/animales/"+t)}}]),t}()},9255:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("d4ec"),a=n("bee2"),i=n("bc3a"),o=n.n(i),c=function(){function t(){Object(r["a"])(this,t)}return Object(a["a"])(t,[{key:"getAllMedicinas",value:function(){return o.a.get("https://veterinariaapi.herokuapp.com/api/botiquin/")}},{key:"createMedicina",value:function(t){return o.a.post("https://veterinariaapi.herokuapp.com/api/botiquin/",t)}},{key:"editMedicina",value:function(t){return o.a.put("https://veterinariaapi.herokuapp.com/api/botiquin/",t)}},{key:"getMedicinaById",value:function(t){return o.a.get("https://veterinariaapi.herokuapp.com/api/botiquin/"+t)}},{key:"deleteMedicina",value:function(t){return o.a.delete("https://veterinariaapi.herokuapp.com/api/botiquin/"+t)}}]),t}()},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,n,r){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),o=new j(r||[]);return i._invoke=D(t,n,o),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=s;var l="suspendedStart",d="suspendedYield",h="executing",m="completed",f={};function p(){}function v(){}function y(){}var g={};g[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b($([])));w&&w!==n&&r.call(w,i)&&(g=w);var x=y.prototype=p.prototype=Object.create(g);function k(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function L(t,e){function n(a,i,o,c){var s=u(t[a],t,i);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"===typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,o,c)}),(function(t){n("throw",t,o,c)})):e.resolve(d).then((function(t){l.value=t,o(l)}),(function(t){return n("throw",t,o,c)}))}c(s.arg)}var a;function i(t,r){function i(){return new e((function(e,a){n(t,r,e,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function D(t,e,n){var r=l;return function(a,i){if(r===h)throw new Error("Generator is already running");if(r===m){if("throw"===a)throw i;return q()}n.method=a,n.arg=i;while(1){var o=n.delegate;if(o){var c=E(o,n);if(c){if(c===f)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var s=u(t,e,n);if("normal"===s.type){if(r=n.done?m:d,s.arg===f)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=m,n.method="throw",n.arg=s.arg)}}}function E(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,E(t,n),"throw"===n.method))return f;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var a=u(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,f;var i=a.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,f):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,f)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function $(t){if(t){var n=t[i];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function n(){while(++a<t.length)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:q}}function q(){return{value:e,done:!0}}return v.prototype=x.constructor=y,y.constructor=v,y[c]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},k(L.prototype),L.prototype[o]=function(){return this},t.AsyncIterator=L,t.async=function(e,n,r,a,i){void 0===i&&(i=Promise);var o=new L(s(e,n,r,a),i);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},k(x),x[c]="Generator",x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=$,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return c.type="throw",c.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],c=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var s=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;O(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:$(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),f}},t}(t.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},af39:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("v-col",{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Registro de medicamento "),n("hr")]),n("v-col",{attrs:{cols:"12"}},[n("v-row",{staticClass:"pl-3"},[n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Código",hint:"Código","persistent-hint":""},model:{value:t.medicamentoData.codigo,callback:function(e){t.$set(t.medicamentoData,"codigo",e)},expression:"medicamentoData.codigo"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Medicamento",hint:"Nombre de la medicina","persistent-hint":""},model:{value:t.medicamentoData.medicina,callback:function(e){t.$set(t.medicamentoData,"medicina",e)},expression:"medicamentoData.medicina"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Cantidad",hint:"Cantidad existente","persistent-hint":"",type:"number",min:0},model:{value:t.medicamentoData.cantidad,callback:function(e){t.$set(t.medicamentoData,"cantidad",e)},expression:"medicamentoData.cantidad"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Unidad de medida",hint:"Unidades de medida","persistent-hint":""},model:{value:t.medicamentoData.unidades,callback:function(e){t.$set(t.medicamentoData,"unidades",e)},expression:"medicamentoData.unidades"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Presentación",hint:"Presentación del medicamento","persistent-hint":""},model:{value:t.medicamentoData.presentacion,callback:function(e){t.$set(t.medicamentoData,"presentacion",e)},expression:"medicamentoData.presentacion"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Cantidad alerta",hint:"Cantidad de alerta","persistent-hint":"",type:"number",min:0},model:{value:t.medicamentoData.alerta,callback:function(e){t.$set(t.medicamentoData,"alerta",e)},expression:"medicamentoData.alerta"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Marca",hint:"Marca del medicamento","persistent-hint":""},model:{value:t.medicamentoData.marca,callback:function(e){t.$set(t.medicamentoData,"marca",e)},expression:"medicamentoData.marca"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"Observaciones",hint:"Observaciones","persistent-hint":""},model:{value:t.medicamentoData.observaciones,callback:function(e){t.$set(t.medicamentoData,"observaciones",e)},expression:"medicamentoData.observaciones"}})],1)],1)],1),n("v-col",{attrs:{cols:"12"}},[n("v-btn",{staticClass:"ml-3",attrs:{color:"primary",dark:""},on:{click:function(e){return t.guardar()}}},[t._v("Guardar")]),n("v-btn",{staticClass:"ml-3",attrs:{color:"error",dark:""},on:{click:function(e){return t.$router.push({name:"BotiquinList"})}}},[t._v("Cancelar")])],1)],1)},a=[],i=(n("96cf"),n("1da1")),o=n("3597"),c=n("9255"),s={name:"botiquin-create",data:function(){return{animalesService:null,botiquinService:null,type:"create",medicamentoData:{id:0,codigo:null,medicina:null,cantidad:0,unidades:null,presentacion:null,marca:null,alerta:0,observaciones:""},animales:[]}},created:function(){this.animalesService=new o["a"],this.botiquinService=new c["a"]},mounted:function(){var t=this;this.$route.params.id&&(this.type="edit",this.botiquinService.getMedicinaById(this.$route.params.id).then((function(e){t.medicamentoData=e.data.data,t.medicamentoData["id"]=t.$route.params.id})).catch((function(t){console.log(t)})))},methods:{guardar:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=null,"create"!=t.type){e.next=6;break}return e.next=4,t.botiquinService.createMedicina(t.medicamentoData).then((function(){n={text:"Registro guardado exitosamente",snackbar:!0,color:"success"},t.$emit("mostrarMensaje",n),t.$router.push({name:"BotiquinList"})})).catch((function(t){console.log(t)}));case 4:e.next=7;break;case 6:n={text:"Registro editado exitosamente",snackbar:!0,color:"success"};case 7:case"end":return e.stop()}}),e)})))()}}},u=s,l=n("2877"),d=n("6544"),h=n.n(d),m=n("8336"),f=n("62ad"),p=n("0fd9"),v=n("8654"),y=Object(l["a"])(u,r,a,!1,null,"22069584",null);e["default"]=y.exports;h()(y,{VBtn:m["a"],VCol:f["a"],VRow:p["a"],VTextField:v["a"]})}}]);
//# sourceMappingURL=chunk-20441a06.6495b734.js.map