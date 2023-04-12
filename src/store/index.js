import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import products from "./modules/products";
import user from "./modules/user";
import favourite from "./modules/favourite";
// In order to retain data in Vuex vuex-persistedstate
export default new Vuex.Store({
  modules: {
    products,
    user,
    favourite
  },
  plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
});
