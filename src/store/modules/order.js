import { order } from "@/services/order";

const state={
orders:[]
}

const getters={
allOrders:(state)=>[...state.orders]
}

const actions={
    async getOrders({commit,rootState}){
        const token = rootState.user.token;
        const headers = { token };
        if (token) {

            const response = await order(headers);
            console.log("order response-------->", response.data)
            commit("setOrders", response?.data)
        }
    }

}

const mutations={
    setOrders: (state, orders) => (state.orders = orders),
}

export default{
    state,
    getters,
    actions,
    mutations
}