import api from "@/common/apis";

export const payableAmount = ({data,headers}) => api.post('coupon/applyCoupon', data,{headers})