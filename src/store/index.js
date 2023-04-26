import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import products from "./modules/products";
import user from "./modules/user";
import favourite from "./modules/favourite";
import cart from "./modules/cart";
import category from "./modules/category"
import checkout from "./modules/coupon"
import order from "./modules/order"
import contact from "./modules/contact"

// In order to retain data in Vuex vuex-persistedstate
export default new Vuex.Store({
  modules: {
    products,
    user,
    favourite,
    cart,
    category,
    checkout,
    order,
    contact
  },
  plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
});
