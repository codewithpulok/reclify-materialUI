import { getPublicEndpoint, publicEndpoints } from '../../endpoints';
import { clientAsyncWrapper } from '../../helpers';

/**
 * @typedef {undefined} WarehouseListApiBody
 */

/** @type {ClientAsyncReturn<WarehouseListApiBody>} */
const warehouseListApi = clientAsyncWrapper(async (body) => {
  const response = await fetch(getPublicEndpoint(publicEndpoints.warehouses.list), {
    method: 'GET',
  });

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default warehouseListApi;
