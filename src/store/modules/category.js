import { fetchCategories } from "@/services/category";



const state = {
    categories: [],
};

const getters = {
    allCategories: (state) => [...state.categories],
};

const actions = {

    async fetchCategories({ commit }) {
        const response = await fetchCategories();
        commit("setCategories", response.data.categories);
        console.log(response.data);
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
};

const mutations = {
    setCategories: (state, categories) => (state.categories = categories),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
