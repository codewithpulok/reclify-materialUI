import PropTypes from 'prop-types';
import { WarehousesCreateView } from 'src/sections/private/dashboard/warehouses';

export const metadata = {
  title: 'Create Warehouse - Racklify',
};

const WarehouseCreatePage = async ({ searchParams }) => (
  <WarehousesCreateView id={searchParams?.clone} />
);

WarehouseCreatePage.propTypes = {
  searchParams: {
    clone: PropTypes.string,
  },
};

export default WarehouseCreatePage;
