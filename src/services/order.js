import api from "@/common/apis";
export const order = (headers) => api.get("order",{ headers });
export const returnOrder=(data)=>api.post("returnOrder/create", data)