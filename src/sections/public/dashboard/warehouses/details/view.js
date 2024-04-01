'use client';

import PropTypes from 'prop-types';
// local components
import { WarehouseDetails } from 'src/components/warehouse/details';

/**
 * Warehouse Details page component
 * @param {DetailsView.propTypes} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { warehouse } = props;

  return <WarehouseDetails warehouse={warehouse} reviews={warehouse?.reviews || []} />;
}

DetailsView.propTypes = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object,
};

export default DetailsView;
