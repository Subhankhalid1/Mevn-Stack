import api from "@/common/apis";

export const cartGetItems = (headers) => api.get('cart',{headers})
export const cartPostItem = ({data, headers}) => api.post('cart/create', data, {headers})
export const cartDeleteItem = ({data,headers}) => api.post('cart/delete',data,{headers})
export const cartPostUpdate = ({data,headers}) => api.post('cart/update',data,{headers})