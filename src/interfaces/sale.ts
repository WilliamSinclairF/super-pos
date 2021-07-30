import { User } from './user';
import { Store } from './store';
export interface Sale {
  id: number;
  createdAt: Date;
  modifiedAt: Date;
  store: Store;
  user: User;
  amount: number;
  note: string;
}

export interface SaleCreationOptions {
  storeId: number;
  amount: number;
  note: string;
}
