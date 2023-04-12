
import { register, login } from "@/services/user";

const state = {
  user:null,
  token:"",
};
const getters = {
    userInfo:(state)=>state?.user,
    u_token:(state)=>state?.user?.token
  };

const actions = {
  

    async registerUser({ commit }, user) {
        const response = await register(user);
        commit("setUser", response.data);
        console.log("user--->",response.data);
      },

      async loginUser({commit}, user){
        const response = await login(user);
        commit("setUser", response.data);
        commit("setToken", response.data.token);
        console.log("user--->",response.data);
      },
      logout({ commit }) {
        commit('LOGOUT');
      }

    

};
const mutations = {
    setUser: (state, value) => (state.user = value),
    setToken:(state,value)=>(state.token=value),
    LOGOUT:(state) => {
      state.token = "";
      state.user = null;
    }
  
};


export default {
  state,
  mutations,
  actions,
  getters,
};
