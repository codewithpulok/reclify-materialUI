import { endpoints } from '../endpoints';
import { clientAsyncWrapper, credentialFetch } from '../helpers';

/** @type {ClientAsyncReturn<string, Warehouse>} */
export const getWarehouse = clientAsyncWrapper(async (id) => {
  const response = await credentialFetch(`${endpoints.warehouses.get}/${id}`);
  const json = await response.json();

  return json;
});
