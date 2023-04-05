// import axios from "axios";
// import api from '../../common/apis';
// import {  filterBetweenPrice,searchFilter } from "../../common/apis";
import axios from 'axios';
import { store } from '../index';
import { fetchCategories } from "@/services/category";
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
  categories: [],
  cart: [],
};

const getters = {
  allProducts: (state) => [...state.products],
  allCategories: (state) => [...state.categories],
  allCartProducts: (state) => [...state.cart],
  loading: (state) => {
    return state.loading;
  },
};

const actions = {
  async fetchCategories({ commit }) {
    const response = await fetchCategories();
    commit("setCategories", response.data.categories);
    console.log(response.data);
  },

  async fetchProducts({ commit }) {
    commit("setLoading", true);
    const response = await getAllProducts();
    commit("setProducts", response.data.products);
    commit("setLoading", false);
  },

  async productsByCategory({ commit }, _id) {
    console.log("_id-------->", _id[0]);
    
    if (_id[0]==undefined) {
      const response = await getAllProducts();
      commit("setProducts", response.data.products);
      console.log(response.data);
    } else {
     
      const response = await ProductsByCategory(_id[0]);
      // await api.post(ProductsByCategory,{category_name:_id});
      commit("setProducts", response.data.data);
      console.log(response.data.data);
    }
  },

  async categoryWithName({ commit }, item) {
    if (item) {
      const response = await filterProductsByCategory(item);
      // api.get(`${searchFilter}/${item.search.toLowerCase()}?category=${item.cateSelect}`);
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
      // api.get(
      //   `${filterBetweenPrice}?minPrice=${minPrice}&maxPrice=${maxPrice}`
      // );
      commit("setProducts", response.data);
      console.log(searchItem, response.data);
    }
  }, 500),

  async searchProductByMoq({ commit }, searchItem) {
    const response = await searchFilterOnMOQ(searchItem);
    // api.get(
    //   `${searchFilter}/${searchItem}`
    // );
    commit("setProducts", response.data);
    console.log(searchItem, response.data);
    //  else {
    //   const response = await axios.get(getAllProducts);
    //   commit("setProducts", response.data);
    //   console.log(response.data);
    // }
  },
  async setCartProducts({ commit }, item) {
    console.log("item---->",item._id)
   
    console.log("state.cart--->")
    commit("setCart", item);
  },
  async removeCartProduct({ commit }, product) {
    commit("removeFromCart", product);
  },
  async increaseQuantity({ commit }, product) {
    commit("increaseCartQTY", product);
  },
  async decreaseQuantity({ commit }, product) {
    commit("decreaseCartQTY", product);
  },
  async searchCategories({ commit }, searchCategory) {
    if (searchCategory.target.value !== "") {
      const filterData = state.categories.filter((item) => {
        return item.category
          .toLowerCase()
          .match(searchCategory.target.value.toLowerCase());
      });
      commit("setCategories", filterData);
    } else {
      const response = await fetchCategories();
      commit("setCategories", response.data.categories);
      console.log(response.data);
    }
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
  async postCartData({commit},userInfo){
    console.log("token watch----->", userInfo.token)
    // console.log("token watch----->", userInfo.user._id)
    const itemId=state.cart.map((item, ind)=>item._id)
    console.log("state.cart--->",itemId)
    // var ID
    // for(const id of itemId){
    //   console.log("single cart ID--->",id)
    //   ID=id
    // }

    
  
    // const token = getters.u_token;
    const {token} = userInfo;
    if(token){
    const headers = { token }
    console.log("header----->", headers)
  
    // const data={
    //   quantity:state.cart.quantity,
    //   product:state.cart
    // }
    // const response = await axios.post('http://localhost:5000/api/cart/create',data, { headers })
    // commit("setCart",response?.data?.data)
    // console.log("Cart response ----->",response.data)
  }
    
    else{
      commit("setCart",[])
    }
  },

  async fetchCartData({commit},token){
    console.log("token from fetchCartData----->", token)
    // const token = getters.u_token;
   
    const headers = { token }
    console.log("header----->", headers)
    if(token){
  
    const response = await axios.get('http://localhost:5000/api/cart', { headers })
    commit("setCart",response?.data)
   
    console.log("state.cart ----->",state.cart)
  }
    
    else{
      commit("setCart",[])
    }
  }


};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setCategories: (state, categories) => (state.categories = categories),
  setLoading: (state, value) => (state.loading = value),
  setCart: (state, product) => {
    const index = state.cart.findIndex((p) => p._id === product._id);
    console.log("index====>", index);
    if (index === -1) {
      state.cart.push({ ...product, quantity: 1 });
    } else {
      state.cart[index].quantity++;
    }
    // state.cart.push(product)
  },
  removeFromCart: (state, product) => {
    const index = state.cart.findIndex((p) => p._id === product._id);
    console.log("index====>", index);
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
