import axios from 'axios';
import { Store } from '../interfaces/store';
import { getAuthHeaders } from './auth';

const API_URL = '/stores';

export const getAllStores = async (): Promise<Store[]> => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.get(API_URL, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
