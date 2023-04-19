import api from "@/common/apis";
export const order = (headers) => api.get("order",{ headers });