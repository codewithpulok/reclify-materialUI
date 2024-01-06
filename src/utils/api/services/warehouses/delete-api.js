import { getPublicEndpoint, publicEndpoints } from '../../endpoints';
import { clientAsyncWrapper } from '../../helpers';

/**
 * @typedef {string} WarehouseDeleteApiId
 */

/** @type {ClientAsyncReturn<WarehouseDeleteApiId>} */
const warehouseDeleteApi = clientAsyncWrapper(async (id) => {
  const response = await fetch(getPublicEndpoint(`${publicEndpoints.warehouses.delete}/${id}`), {
    method: 'DELETE',
  });

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default warehouseDeleteApi;
