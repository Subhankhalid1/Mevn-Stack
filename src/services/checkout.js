import api from "@/common/apis";

export const checkout = ({ data, headers }) =>
  api.post("checkout/create", data, { headers });
