const { loadStripe } = require('@stripe/stripe-js');
const { STRIPE_PK } = require('src/config-global');

const stripePromise = loadStripe(STRIPE_PK);

export default stripePromise;
