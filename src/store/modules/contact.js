import { contact } from "@/services/contact";
const state={

}

const getters={

}

const actions={
    async sendContact({ commit }, data) {
        const response = await contact(data);
        // commit("setUser", response.data);
        console.log("contact",response.data);
      }

}

const mutations={

}

export default{
    state,
    getters,
    actions,
    mutations
}