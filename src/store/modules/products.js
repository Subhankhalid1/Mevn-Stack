import {
  getAllProducts,
  ProductsByCategory,
  filterProductByPrice,
  searchFilterOnMOQ,
  filterProductsByCategory,
} from "@/services/product";
import { debounce } from "lodash";


const state = {
  loading: false,
  products: [],
};

const getters = {
  allProducts: (state) => [...state.products],
  loading: (state) => {
    return state.loading;
  },
};

const actions = {

  async fetchProducts({ commit }) {
    commit("setLoading", true);
    const response = await getAllProducts();
    commit("setProducts", response.data.products);
    commit("setLoading", false);
  },

  async productsByCategory({ commit }, _id) {
    if (_id[0] == undefined) {
      const response = await getAllProducts();
      commit("setProducts", response.data.products);
      console.log(response.data);
    } else {
      const response = await ProductsByCategory(_id[0]);
      commit("setProducts", response.data.data);
      console.log(response.data.data);
    }
  },

  async categoryWithName({ commit }, item) {
    if (item) {
      const response = await filterProductsByCategory(item);
      commit("setProducts", response.data);
      console.log(response.data);
    } else {
      const response = await getAllProducts();
      commit("setProducts", response.data.products);
      console.log(response.data);
    }
  },

  filterBetweenPrice: debounce(async ({ commit }, searchItem) => {
    const { minPrice, maxPrice } = searchItem;
    if (searchItem) {
      const response = await filterProductByPrice(minPrice, maxPrice);
      commit("setProducts", response.data);
      console.log(searchItem, response.data);
    }
  }, 500),

  async searchProductByMoq({ commit }, searchItem) {
    const response = await searchFilterOnMOQ(searchItem);
    commit("setProducts", response.data);
    console.log(searchItem, response.data);
  },

  async filterProducts({ commit, state }, e) {
    console.log("e--->", e.target.value);

    if (e.target.value === "Low to High") {
      const filterData = state.products.sort(
        (item1, item2) => item1.price - item2.price
      );

      commit("setProducts", [...filterData]);
      console.log("filterData---->", filterData);
    } else if (e.target.value === "High to Low") {
      const filterData = state.products.sort(
        (item1, item2) => item2.price - item1.price
      );

      commit("setProducts", [...filterData]);
      console.log("filterData---->", filterData);
    } else if (e.target.value === "Sort By Name") {
      const filterData = state.products.sort((a, b) => {
        if (a.product_name > b.product_name) {
          return 1;
        } else {
          return -1;
        }
      });

      commit("setProducts", [...filterData]);
      console.log("filterData using Name---->", filterData);
    } else {
      const response = await getAllProducts();
      commit("setProducts", response.data.products);
      console.log(response.data);
    }
  },
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setLoading: (state, value) => (state.loading = value),
};


export default {
  state,
  getters,
  actions,
  mutations,
};
