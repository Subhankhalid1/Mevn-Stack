import api from "@/common/apis";

export const contact = (data) => api.post('query/postQuery', data)