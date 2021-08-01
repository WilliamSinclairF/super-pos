import { TaxCode } from './taxCode';
export interface Store {
  id?: string;
  name: string;
  description?: string;
  address: string;
  createdAt?: Date;
  modifiedAt?: Date;
  storeSettings?: StoreSettings;
}

export interface StoreSettings {
  taxCodes: TaxCode[];
  open: boolean;
}
