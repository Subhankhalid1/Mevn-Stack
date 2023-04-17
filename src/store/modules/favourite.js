import { allFavData, favPostItem, favDeleteItem } from "@/services/favourite";

const state = {
  favourite: [],
};


const getters = {
  allfavProducts: (state) => [...state.favourite],
};

const actions = {
  async getFavData({ commit, rootState }) {
    const token = rootState.user.token;
    const headers = { token };
    if (token) {
      const response = await allFavData(headers);
      console.log(response.data);
      commit("setFavourite", { product: response?.data.data, isNew: true });

      // console.log("state.Favourite data----->", state.favourite);
    } else {
      commit("setFavourite", { product: [] });
    }
  },

  async postFavData({ commit, rootState }, pId) {
    console.log("pId favourite----->", pId._id);
    const token = rootState.user.token;

    if (token) {
      const headers = { token };
      const data = {
        productId: pId._id,
      };
      const response = await favPostItem({ data, headers });

      if (response) {
        commit("addToFav", response.data.data);
      }
    } else {
      commit("addToFav", { product: [] });
    }
  },

  async removeFavProduct({ commit, rootState }, productId) {
    const token = rootState.user.token;
    console.log("productId--->", productId);
    if (token) {
      const headers = { token };
      const data = { product: productId };
      const response = await favDeleteItem({ data, headers });
      if (response) {
        commit("removeFromFavourite", productId);
      }
    }
  },
};



const mutations = {
  setFavourite: (state, { product, isNew }) => {
    if (isNew) {
      state.favourite = product;
      // console.log(product);
      return;
    }
    console.log("index====>", product);
    const index = state.favourite.findIndex((p) => p._id === product._id);
    console.log("index====>", index);
    if (index === -1) {
      state.favourite.push({ ...product });
    } else {
      state.favourite;
    }
  },
  addToFav: (state, payload) => {
    state.favourite.unshift(payload);
  },
  removeFromFavourite: (state, pId) => {
    const index = state.favourite.findIndex((p) => p?.product._id === pId);
    console.log("index====>1111 fav", index);
    if (index !== -1) {
      state.favourite.splice(index, 1);
    }
  },
};



export default {
  state,
  mutations,
  actions,
  getters,
};
