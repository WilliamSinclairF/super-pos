import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { SALES_FIELDS } from '../../constants/sales/saleFields';
import { useStoreContext } from '../../context/StoreContext';
import { Sale } from '../../interfaces/sale';
import { getStoreSales } from '../../services/stores';

export const SalesList = () => {
  const { activeStore } = useStoreContext();

  const [sales, setSales] = useState<Sale[]>();

  const fetchSales = async () => {
    if (!activeStore) {
      return;
    }
    const fetchedSales = await getStoreSales(+activeStore.id);
    setSales(fetchedSales);
  };

  useEffect(() => {
    fetchSales();
  }, [activeStore]);

  if (!sales?.length) {
    return null;
  }

  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          {SALES_FIELDS.map((field) => (
            <th>{field.humanName}</th>
          ))}
        </tr>
      </thead>
      {sales && (
        <tbody>
          {sales.map((sale) => (
            <tr>
              {SALES_FIELDS.map((field) => {
                if (field.internalName === 'user') {
                  return <td>{sale.user.id}</td>;
                }
                if (field?.type === 'date') {
                  return <td>{sale[field.internalName]}</td>;
                } else if (field?.type === 'currency') {
                  return (
                    <td>
                      {new Intl.NumberFormat('en-CA', {
                        style: 'currency',
                        currency: 'CAD',
                      }).format(sale[field.internalName])}
                    </td>
                  );
                } else {
                  return <td>{sale[field.internalName]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
};
