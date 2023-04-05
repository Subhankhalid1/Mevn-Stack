import api from "@/common/apis";

export const register = (user) => api.post('user/register', user)
export const login = (user) => api.post('user/login', user)