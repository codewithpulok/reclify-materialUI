import { getPublicEndpoint, publicEndpoints } from '../../endpoints';
import { clientAsyncWrapper } from '../../helpers';

/**
 * @typedef {object} WarehouseUpdateApiBody
 * @property {string} id
 */

/** @type {ClientAsyncReturn<WarehouseUpdateApiBody>} */
const warehouseUpdateApi = clientAsyncWrapper(async (body) => {
  const response = await fetch(
    getPublicEndpoint(`${publicEndpoints.warehouses.update}/${body.id}`),
    {
      body: JSON.stringify(body),
      method: 'PUT',
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default warehouseUpdateApi;
