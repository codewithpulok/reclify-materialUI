import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51MPolVSACfNSBr0nayGTXr3ULiPXMd4JHvZM2TBVpKBBq37XK9soFXK04d7emLB60SqWop4JYf2Kxtwz7Gaij1e900bigEdGZ6'
);

const createPaymentIntent = async (data) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: data.card,
    billing_details: data.billing_details,
  });

  // create a stripe customer
  const customer = await stripe.customers.create({
    name: data.name,
    email: data.email,
    payment_method: paymentMethod.id,
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });

  // create a payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method: paymentMethod.id,
    customer: customer.id,
    currency: 'usd',
    amount: data.amount,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // return the client secret and subscription id
  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const response = await createPaymentIntent(body);
    return Response.json(response);
  } catch (error) {
    console.log('Error: ', error);
    return Response.error({ message: error?.message });
  }
};
