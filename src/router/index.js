import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/home/scenic-spot",
    redirect: { name: "search-scenic-spot" },
  },
  {
    path: "/home/scenic-spot/:ScenicSpotID",
    name: "scenic-spot",
    component: () => import("../views/ScenicSpot.vue"),
  },
  {
    path: "/home/activity",
    redirect: { name: "search-activity" },
  },
  {
    path: "/home/activity/:ActivityID",
    name: "activity",
    component: () => import("../views/Activity.vue"),
  },
  {
    path: "/home/restaurant",
    redirect: { name: "search-restaurant" },
  },
  {
    path: "/home/restaurant/:RestaurantID",
    name: "restaurant",
    component: () => import("../views/Restaurant.vue"),
  },
  {
    path: "/home/search-scenic-spot",
    name: "search-scenic-spot",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/home/search-activity",
    name: "search-activity",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/home/search-restaurant",
    name: "search-restaurant",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes
})

export default router
