import api from "@/common/apis";

export const checkout = (data) => api.post('checkout/create', data)