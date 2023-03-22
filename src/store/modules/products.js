import axios from "axios";
import { getAllProducts, ProductsByCategory,fetchCategory,serverURL,filterBetweenPrice,searchFilter } from "../../common/apis";
const state = {
  loading: false,
  products: [],
  categories: [],
  

  // searchProduct:[]
};

const getters = {
  allProducts: (state) => [...state.products],
  allCategories: (state) => [...state.categories],
  loading:(state)=> { return state.loading }
 
};

const actions = {
  async fetchCategories({commit}) {
    const response = await axios.get(fetchCategory);
    commit("setCategories", response.data);
    console.log(response.data)
  },

  async fetchProducts({ commit }) {
    commit('setLoading', true)
    const response = await axios.get(getAllProducts);
    commit("setProducts", response.data);
    commit('setLoading', false)
  },

  async productsByCategory({commit}, _id){
   
    console.log("_id-------->", _id)
    if(_id){
    const response = await axios.post(ProductsByCategory,{category_name:_id});
    commit("setProducts", response.data);
    console.log(response.data)
    }
    else{
      const response = await axios.get(getAllProducts);
      commit("setProducts", response.data);
      console.log(response.data);
    }
  },
  
  async categoryWithName({commit}, item) {
    if(item){
    const response = await axios.get(`${searchFilter}/${item.search.toLowerCase()}?category=${item.cateSelect}`);
    commit("setProducts", response.data);
    console.log(response.data)
    }
    else{
      const response = await axios.get(getAllProducts);
      commit("setProducts", response.data);
      console.log(response.data);
    }
  },



  async filterBetweenPrice({commit}, searchItem){
    const {minPrice, maxPrice}=searchItem
    if (searchItem) {
      const response = await axios.get(
        `${filterBetweenPrice}?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      commit("setProducts", response.data);
      console.log(searchItem, response.data);
    }

  },

  async searchProductByMoq({ commit }, searchItem) {
   
      const response = await axios.get(
        `${searchFilter}/${searchItem}`
      );
      commit("setProducts", response.data);
      console.log(searchItem, response.data);
    //  else {
    //   const response = await axios.get(getAllProducts);
    //   commit("setProducts", response.data);
    //   console.log(response.data);
    // }
  },
    async searchCategories({commit}, searchCategory){
if(searchCategory.target.value!==""){
      const filterData=state.categories.filter(item=>{
        return item.category.toLowerCase().match(searchCategory.target.value.toLowerCase())
      })
      commit("setCategories", filterData);
    }
    else {
      const response = await axios.get(fetchCategory);
    commit("setCategories", response.data);
    console.log(response.data)
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
      const response = await axios.get(getAllProducts);
      commit("setProducts", response.data);
      console.log(response.data);
    }
  },
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setCategories: (state, categories) => (state.categories = categories),
  setLoading:(state, value)=> ( state.loading = value )
  // pagination
  // filterProduct:(state, filterData)=>(state.searchProduct=filterData)
};

export default {
  state,
  getters,
  actions,
  mutations,
};
