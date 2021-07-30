import { SaleCreationOptions } from './../interfaces/sale';
import { NewSaleResponse } from './../interfaces/server';
import axios from 'axios';
import { getAuthHeaders } from './auth';

const API_URL = '/sales';

export const addSale = async (sale: SaleCreationOptions): Promise<NewSaleResponse> => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.post(API_URL, sale, headers);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllSales = async () => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.get(API_URL, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
