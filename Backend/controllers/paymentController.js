import Stripe from 'stripe';
import cartModel from '../models/cartModel.js';
import Appointment from '../models/appointmentModel.js';

 const FRONTEND_URL = "https://react-hair-salon-frontend.onrender.com"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
  try {
    console.log('User ID:', req.userId);  // Add this line to check if userId is set

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
      success_url: `${FRONTEND_URL}/payment-success`,
      cancel_url: `${FRONTEND_URL}/payment-cancelled`,
      billing_address_collection: 'required', // Customer ka address mandatory
      customer_email: customerEmail, // Email include karo
      metadata: {
        customer_name: customerName, // Stripe ke metadata me name add karo
        customer_address: customerAddress, // Address bhi add karo
      },
    });

    // Clear the cart from the database after payment successful
    console.log('Clearing cart for user with ID:', req.userId); // Log userId before clearing cart
    await clearCartInDatabase(req.userId); // You need to implement clearCartInDatabase

    res.json({
      success: true,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const clearCartInDatabase = async (userId) => {
  try {

    // Cart delete karna
    const cartItems = await cartModel.find({ userId });

    if (cartItems.length > 0) {
      await cartModel.deleteMany({ userId });
      console.log(`Cart cleared successfully for user ID: ${userId}`);
    } else {
      console.log('No cart items found for this user.');
    }

    // Appointment ko isPaid: true mark karna
    const appointment = await Appointment.findOne({ userId, isPaid: false });
    console.log("Appointment Found:", appointment); // Check if appointment is found


    if (appointment) {
      // await Appointment.updateOne({ userId }, { $set: { isPaid: true } });
      const updateResult = await Appointment.updateOne({ userId, isPaid: false }, { $set: { isPaid: true } });
      console.log("Update Result:", updateResult);
      console.log(`Appointment marked as paid for user ID: ${userId}`);
    } else {
      console.log('No appointment found for this user.');
    }
    
  } catch (err) {
    console.log('Error clearing cart and updating appointment:', err);
  }
};


export { stripePayment };

