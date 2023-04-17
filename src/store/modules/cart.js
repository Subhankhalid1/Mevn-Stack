import { debounce } from "lodash";
import {cartGetItems,cartPostItem,cartDeleteItem,cartPostUpdate} from "@/services/cart";



const state = {
    cart: [],
};

const getters = {
    allCartProducts: (state) => [...state.cart],
};

const actions = {
    async postCartData({ commit, rootState }, pId) {
        const token = rootState.user.token;
        if (token) {
          const headers = { token };
    
          const data = {
            productId: pId._id,
            quantity: 1,
          };
          const response = await cartPostItem({data, headers})
          if (response) {
            commit("addToCart", response.data.data);
          }
        } else {
          commit("setCart", { product: [] });
        }
      },
    
      async fetchCartData({ commit, rootState }) {
        const token = rootState.user.token;
    
        const headers = { token };
        if (token) {
          const response = await cartGetItems(headers)
          console.log(response.data);
          commit("setCart", { product: response?.data.data, isNew: true });
        } else {
          commit("setCart", { product: [] });
        }
      },

    async removeCartProduct({ commit, rootState }, productId) {
        const token = rootState.user.token;
        if (token) {
          const headers = { token };
          const data = { _id: productId };
          const response = await cartDeleteItem({data,headers})
         
    
          if (response) {
            commit("removeFromCart", productId);
          }
        }
      },
    
      increaseQuantity: debounce(async ({ commit, rootState }, product) => {
        const token = rootState.user.token;
        const headers = { token };
        const data = {
          _id: product._id,
          quantity: product?.quantity,
        };
        const response = await cartPostUpdate({data, headers})
        if (response) {
          commit("increaseCartQTY", product);
        }
      }, 300),
    
      decreaseQuantity: debounce(async ({ commit, rootState }, product) => {
        const token = rootState.user.token;
        const headers = { token };
        const data = {
          _id: product._id,
          quantity: product?.quantity,
        };
        const response = await cartPostUpdate({data,headers})
        // axios.post(
        //   "http://localhost:5000/api/cart/update",
        //   data,
        //   { headers }
        // );
        if(response){
        commit("decreaseCartQTY", product);
        }
      }, 300),

     
};

const mutations = {
    setCart: (state, { product, isNew }) => {
        if (isNew) {
          state.cart = product;
          return;
        }
        const index = state.cart.findIndex((p) => p._id === product._id);
        console.log("index====>", index);
        if (index === -1) {
          state.cart.push({ ...product, quantity: 1 });
        } else {
          state.cart[index].quantity++;
        }
      },
      addToCart: (state, payload) => {
        state.cart.unshift(payload);
      },
      removeFromCart: (state, pId) => {
        const index = state.cart.findIndex((p) => p._id === pId);
        if (index !== -1) {
          state.cart.splice(index, 1);
        }
      },
      increaseCartQTY: (state, product) => {
        const index = state.cart.findIndex((p) => p._id === product._id);
        if (index !== -1) {
          state.cart[index].quantity++;
        }
      },
      decreaseCartQTY: (state, product) => {
        const index = state.cart.findIndex((p) => p._id === product._id);
        if (index !== -1 && state.cart[index].quantity > 1) {
          state.cart[index].quantity--;
        }
      },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
