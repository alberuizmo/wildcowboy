import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//autenticacion
import Login from "../components/autenticacion/login-main";

//modulos y main
import Modules from "../components/modules";
import MainLayout from "../components/main-layout";

//por prueba
import ControlFertility from "../components/control-fertility/control-fertility";
import ControlFertilityList from "../components/control-fertility/control-fertility-list";
import ControlFertilityCreate from "../components/control-fertility/control-fertility-create";

import ErrorPage from "../components/error-page";
import ConstructionPage from "../components/construction-page";

const routes = [
  {
    path: "",
    name: "Home",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/modules",
    name: "Modules",
    component: Modules,
  },
  {
    path: "/main",
    name: "Main",
    component: MainLayout,
    children: [
      {
        path: "potreros",
        component: () => import("../components/potreros/potreros"),
        children: [
          {
            path: "",
            name: "PotrerosList",
            component: () => import("../components/potreros/potreros-list"),
          },
          {
            path: "create/:id?",
            name: "PotrerosCreate",
            component: () => import("../components/potreros/potreros-create"),
          },
        ],
      },
      {
        path: "roles",
        component: () => import("../components/roles/roles"),
        children: [
          {
            path: "",
            name: "RolesList",
            component: () => import("../components/roles/roles-list"),
          },
          {
            path: "create/:id?",
            name: "RolesCreate",
            component: () => import("../components/roles/roles-create"),
          },
        ],
      },
      {
        path: "usuarios",
        component: () => import("../components/usuarios/usuarios"),
        children: [
          {
            path: "",
            name: "UsuariosList",
            component: () => import("../components/usuarios/usuarios-list"),
          },
          {
            path: "create/:id?",
            name: "UsuariosCreate",
            component: () => import("../components/usuarios/usuarios-create"),
          },
        ],
      },
      {
        path: "animales",
        component: () => import("../components/animales/animales"),
        children: [
          {
            path: "",
            name: "AnimalesList",
            component: () => import("../components/animales/animales-list"),
          },
          {
            path: "create/:id?",
            name: "AnimalesCreate",
            component: () => import("../components/animales/animales-create"),
          },
        ],
      },
      {
        path: "actividades",
        component: () => import("../components/actividades/actividades"),
        children: [
          {
            path: "",
            name: "ActividadesList",
            component: () =>
              import("../components/actividades/actividades-list"),
          },
        ],
      },
      {
        path: "produccionlechera",
        component: () =>
          import("../components/produccion-lechera/produccion-lechera"),
        children: [
          {
            path: "",
            name: "ProduccionLecheraList",
            component: () =>
              import(
                "../components/produccion-lechera/produccion-lechera-list"
              ),
          },
          {
            path: "create/:id?",
            name: "ProduccionLecheraCreate",
            component: () =>
              import(
                "../components/produccion-lechera/produccion-lechera-create"
              ),
          },
          {
            path: "createfast/",
            name: "ProduccionLecheraCreateFast",
            component: () =>
              import(
                "../components/produccion-lechera/produccion-lechera-create-fast"
              ),
          },
        ],
      },
      {
        path: "Inseminaciones",
        component: () => import("../components/inseminaciones/inseminaciones"),
        children: [
          {
            path: "",
            name: "InseminacionesList",
            component: () =>
              import("../components/inseminaciones/inseminaciones-list"),
          },
          {
            path: "create/:id?",
            name: "InseminacionesCreate",
            component: () =>
              import("../components/inseminaciones/inseminaciones-create"),
          },
        ],
      },
      {
        path: "Calores",
        component: () => import("../components/calores/calores"),
        children: [
          {
            path: "",
            name: "CaloresList",
            component: () => import("../components/calores/calores-list"),
          },
          {
            path: "create/:id?",
            name: "CaloresCreate",
            component: () => import("../components/calores/calores-create"),
          },
        ],
      },
      {
        path: "Partos",
        component: () => import("../components/partos/partos"),
        children: [
          {
            path: "",
            name: "PartosList",
            component: () => import("../components/partos/partos-list"),
          },
          {
            path: "create/:id?",
            name: "PartosCreate",
            component: () => import("../components/partos/partos-create"),
          },
        ],
      },
      {
        path: "Enfermedades",
        component: () => import("../components/enfermedades/enfermedades"),
        children: [
          {
            path: "",
            name: "EnfermedadesList",
            component: () =>
              import("../components/enfermedades/enfermedades-list"),
          },
          {
            path: "create/:id?",
            name: "EnfermedadesCreate",
            component: () =>
              import("../components/enfermedades/enfermedades-create"),
          },
        ],
      },
      {
        path: "Botiquin",
        component: () => import("../components/botiquin/botiquin"),
        children: [
          {
            path: "",
            name: "BotiquinList",
            component: () => import("../components/botiquin/botiquin-list"),
          },
          {
            path: "create/:id?",
            name: "BotiquinCreate",
            component: () => import("../components/botiquin/botiquin-create"),
          },
        ],
      },
      {
        path: "control-fertility",
        component: ControlFertility,
        children: [
          {
            path: "",
            name: "ControlFertilityMain",
            component: ControlFertilityList,
          },
          {
            path: "list",
            name: "ControlFertilityList",
            component: ControlFertilityList,
          },
          {
            path: "create/:id?",
            name: "ControlFertilityCreate",
            component: ControlFertilityCreate,
          },
        ],
      },
    ],
  },
  {
    path: "/help-center",
    name: "Help",
    component: ConstructionPage,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: ConstructionPage,
  },
  {
    path: "**",
    component: ErrorPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
