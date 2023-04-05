import { BASE_URL } from '@/constants/constants';
import axios from 'axios';

const api = axios.create({
    baseURL: `${BASE_URL}/api/`, 
    timeout: 5000,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
});

export default api;


//server ending points
// export const serverURL = 'http://localhost:5000/api/';


//products ending points
export const getAllProducts = `product/getAllProducts`;
export const ProductsByCategory=`product/ProductsByCategory`;
export const filterBetweenPrice=`product/filterBetweenPrice`
export const searchFilter=`product/filterProducts`


//categories ending points
// export const fetchCategory=`category/`
