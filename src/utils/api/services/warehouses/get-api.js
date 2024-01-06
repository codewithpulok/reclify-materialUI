import { getPublicEndpoint, publicEndpoints } from '../../endpoints';
import { clientAsyncWrapper } from '../../helpers';

/**
 * @typedef {string} WarehouseGetApiId
 */

/** @type {ClientAsyncReturn<WarehouseGetApiId>} */
const warehouseGetApi = clientAsyncWrapper(async (id) => {
  const response = await fetch(getPublicEndpoint(`${publicEndpoints.warehouses.delete}/${id}`), {
    method: 'GET',
  });

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default warehouseGetApi;
