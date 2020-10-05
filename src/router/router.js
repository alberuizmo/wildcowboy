import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { store } from "@/store/store";
const routes = [
  {
    path: "",
    name: "Home",
    redirect: { name: "Modules" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/autenticacion/login-main"),
    meta: {
      public: true,
      soloCuandoNoEsteLogueado: true,
    },
  },
  {
    path: "/modules",
    name: "Modules",
    component: () => import("../components/modules"),
  },
  {
    path: "/ganaderia",
    name: "Ganaderia",
    component: () => import("../components/main-ganaderia"),
    children: [
      {
        path: "ganaderia",
        name: "DashboardGanaderia",
        component: () => import("../components/dashboard-ganaderia"),
      },
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
          {
            path: "report/",
            name: "ProduccionLecheraReport",
            component: () =>
              import(
                "../components/produccion-lechera/produccion-lechera-reporte"
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
        path: "calores",
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
        path: "partos",
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
        path: "enfermedades",
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
        path: "consumibles",
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
        path: "movimiento-consumibles",
        component: () =>
          import("../components/movimiento-consumibles/movimiento-consumibles"),
        children: [
          {
            path: "",
            name: "MovimientosConsumiblesList",
            component: () =>
              import(
                "../components/movimiento-consumibles/movimiento-consumibles-list"
              ),
          },
          {
            path: "create/:id?",
            name: "MovimientosConsumiblesCreate",
            component: () =>
              import(
                "../components/movimiento-consumibles/movimiento-consumibles-create"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/administracion",
    name: "administracion",
    component: () => import("../components/main-admin"),
    children: [
      {
        path: "admin-dashboard",
        name: "DashboardAdmin",
        component: () => import("../components/dashboard-administracion"),
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
    ],
  },
  {
    path: "/help-center",
    name: "Help",
    component: () => import("../components/construction-page"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../components/construction-page"),
  },
  {
    path: "/agro",
    name: "DashboardAgro",
    component: () => import("../components/construction-page"),
  },
  {
    path: "/equinos",
    name: "DashboardEquinos",
    component: () => import("../components/construction-page"),
  },
  {
    path: "/marketplace",
    name: "DashboardMarketplace",
    component: () => import("../components/construction-page"),
  },
  {
    path: "**",
    component: () => import("../components/error-page"),
    meta: {
      public: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const esPublico = to.matched.some((record) => record.meta.public);
  const soloCuandoNoEsteLogueado = to.matched.some(
    (record) => record.meta.soloCuandoNoEsteLogueado
  );
  const Logueado = store.state.token != null;
  if (!esPublico && !Logueado) {
    return next({ name: "Login" });
  }
  if (Logueado && soloCuandoNoEsteLogueado) {
    return next({ name: "Modules" });
  }
  next();
});

export default router;
