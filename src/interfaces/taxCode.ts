import { taxRate } from './taxRate';

export interface TaxCode {
  createdAt: Date;

  modifiedAt: Date;

  name: string;

  isActive: boolean;

  taxRates: taxRate[];
}
