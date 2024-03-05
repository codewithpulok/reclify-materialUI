import PropTypes from 'prop-types';
import { WarehousesEditView } from 'src/sections/private/dashboard/warehouses';

const WarehouseEditPage = ({ params }) => <WarehousesEditView id={params.id} />;

WarehouseEditPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseEditPage;
