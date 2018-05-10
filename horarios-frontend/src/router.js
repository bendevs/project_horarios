import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Docentes from "./views/Docentes.vue";
import Aulas from "./views/Aulas.vue";
import Materias from "./views/Materias.vue";
import Horarios from "./views/Horarios.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/docentes",
      name: "docentes",
      component: Docentes
    },
    {
      path: "/aulas",
      name: "aulas",
      component: Aulas
    },
    {
      path: "/materias",
      name: "materias",
      component: Materias
    },
    {
      path: "/horarios",
      name: "horarios",
      component: Horarios
    }
  ]
});
