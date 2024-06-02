import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import NewsShowing from "@/views/NewsShowing.vue";
import LocalNews from "@/views/LocalNews.vue";
import WorldNews from "@/views/WorldNews.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/showing/:newsType/:id",
    name: "NewsShowing",
    component: NewsShowing,
  },
  {
    path: "/local/page/:page",
    name: "LocalNews",
    component: LocalNews,
  },
  {
    path: "/world/page/:page",
    name: "WorldNews",
    component: WorldNews,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
