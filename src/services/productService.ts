import http from './httpService';
import config from "../config.json"

const { apiUrl } = config

export interface CartItemType {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  };
  

const getProducts = (): Promise<CartItemType[]> => {
    return http.get(apiUrl)
}

export default {
  getProducts
}