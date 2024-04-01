'use client';

import PropTypes from 'prop-types';
// local components
import { ServiceDetails } from 'src/components/service/details';

/**
 * @param {DetailsView.propTypes} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { service } = props;

  return <ServiceDetails service={service} />;
}

DetailsView.propTypes = {
  service: PropTypes.object.isRequired,
};

export default DetailsView;
