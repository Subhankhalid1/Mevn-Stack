import { payableAmount } from "@/services/coupon";
import { checkout } from "@/services/checkout";

const state = {
  couponPrice: 0,
  showModal: false,
};

const getters = {
  totalPrice: (state) => state?.couponPrice,
};

const actions = {
  async applyCoupon({ commit,rootState }, item) {
    console.log("item", item);
    const token = rootState.user.token;
    const data = {
      couponCode: item.code,
    };
    if (token) {
      const headers = { token };
    const response = await payableAmount({data, headers});
    if (response) {
      console.log("totalprice", response?.data?.data);
      commit("setTotalPrice", response?.data?.data);
    }
  }
  },
  async postCheckoutData({ commit }, item) {
    console.log("item", item);
    try {
      const response = await checkout(item);
      if (response) {
        console.log("totalprice", response?.data?.data);
        commit("openModal");
       
      }
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setTotalPrice: (state, price) => (state.couponPrice = price),
  openModal(state) {
    state.showModal = true;
  },
  closeModal(state) {
    state.showModal = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
