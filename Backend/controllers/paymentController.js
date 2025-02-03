import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
  try {
    const { cartItems, totalPrice, customerName, customerEmail, customerAddress } = req.body;

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    // Service Fee Add Karna
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Service Fee',
        },
        unit_amount: 10 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      billing_address_collection: 'required', // Customer ka address mandatory
      customer_email: customerEmail, // Email include karo
      metadata: {
        customer_name: customerName, // Stripe ke metadata me name add karo
        customer_address: customerAddress, // Address bhi add karo
      },
    });

    res.json({
      success: true,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { stripePayment };
