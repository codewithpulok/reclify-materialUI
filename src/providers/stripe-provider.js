'use client';

import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import stripePromise from 'src/utils/stripe';

/**
 * @param {StripeProvider.propTypes} props
 * @returns {JSX.Element}
 */
const StripeProvider = (props) => {
  const { children } = props;
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

StripeProvider.propTypes = {
  children: PropTypes.node,
};

export default StripeProvider;
