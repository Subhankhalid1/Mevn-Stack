// export const getAllProducts = `product/getAllProducts`;
// export const ProductsByCategory=`product/ProductsByCategory`;
// export const filterBetweenPrice=`product/filterBetweenPrice`
// export const searchFilter=`product/filterProducts`

import api from "@/common/apis";

export const getAllProducts = () => api.get('product/getAllProducts')
export const ProductsByCategory = (_id) => api.post('product/ProductsByCategory',{category_name:_id})
export const filterProductByPrice = (minPrice, maxPrice) => api.get(`product/filterBetweenPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`)
export const searchFilterOnMOQ = (searchItem) => api.get(`product/filterProducts/${searchItem}`)
export const filterProductsByCategory = (item)=>api.get(`product/filterProducts/${item.search.toLowerCase()}?category=${item.cateSelect}`)