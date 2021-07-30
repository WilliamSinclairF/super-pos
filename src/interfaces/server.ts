import { Sale } from './sale';
export interface ServerResponse {
  ok: boolean;
  data?: string;
}

export interface NewSaleResponse extends ServerResponse {
  sale: Sale;
}
