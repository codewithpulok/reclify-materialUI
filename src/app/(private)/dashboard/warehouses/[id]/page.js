import PropTypes from 'prop-types';
import { WarehousesDetailsView } from 'src/sections/private/dashboard/warehouses';

const WarehouseDetailsPage = ({ params }) => <WarehousesDetailsView id={params.id} />;

WarehouseDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseDetailsPage;
