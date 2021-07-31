import { Store } from './store';
import { Sale } from './sale';
export interface ServerResponse {
  ok: boolean;
  data?: string;
}

export interface NewSaleResponse extends ServerResponse {
  sale: Sale;
}

export interface NewStoreResponse extends ServerResponse {
  store: Store;
}
