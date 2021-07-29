import axios from 'axios';
import { Sale } from '../interfaces/sale';
import { getAuthHeaders } from './auth';

const API_URL = '/sales';

export const addSale = async (sale: Sale) => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.post(API_URL, sale, headers);
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
