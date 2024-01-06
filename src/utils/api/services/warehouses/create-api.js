import { getPublicEndpoint, publicEndpoints } from '../../endpoints';
import { clientAsyncWrapper } from '../../helpers';

/**
 * @typedef {Object} WarehouseCreateApiBody
 */

/** @type {ClientAsyncReturn<WarehouseCreateApiBody>} */
const warehouseCreateApi = clientAsyncWrapper(async (body) => {
  const response = await fetch(getPublicEndpoint(publicEndpoints.warehouses.create), {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default warehouseCreateApi;
