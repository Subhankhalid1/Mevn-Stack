import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView";
import Cart from "../components/CartPage/Cart";
import Login from "../components/Registration/Login"
import Signup from "../components/Registration/Signup"
import Favourite from "../components/FavouritePage/Favourite"
import CheckOut from "../components/CheckOut/CheckOutPage"
import Order from "../components/Order/Order"
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/cart",
    name: "/cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "/login",
    component: Login,
  },
  {
    path: "/signup",
    name: "/signup",
    component: Signup,
  },
  {
    path: "/favourite",
    name: "/favourite",
    component: Favourite,
  },
  {
    path: "/checkout",
    name: "/checkout",
    component: CheckOut,
  },
  {
    path: "/order",
    name: "/order",
    component: Order,
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
