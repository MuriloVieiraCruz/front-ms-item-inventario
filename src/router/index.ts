import Vue from "vue";
import Router from "vue-router";

import DashboardInventario from "@/components/Dashboard.vue";
import CreateItem from "@/components/Create.vue";
import UpdateItem from "@/components/Update.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "Dashboard", component: DashboardInventario },
    { path: "/create", name: "Create", component: CreateItem },
    { path: "/update/:id", name: "Update", component: UpdateItem },
  ],
});