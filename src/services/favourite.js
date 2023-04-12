import api from "@/common/apis";

export const allFavData = (headers) => api.get('favourite',{headers})
export const favPostItem = ({data, headers}) => api.post('favourite/create', data, {headers})
export const favDeleteItem = ({data,headers}) => api.post('favourite/delete',data,{headers})
