import Stripe from "stripe";
import cartModel from "../models/cartModel.js";
import Appointment from "../models/appointmentModel.js";

const FRONTEND_URL = "https://react-hair-salon-frontend.onrender.com";
// const FRONTEND_URL = "http://localhost:5173";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
  try {
    console.log("User ID:", req.userId);

    const {
      cartItems,
      totalPrice,
      customerName,
      customerEmail,
      customerAddress,
    } = req.body;

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
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
        currency: "inr",
        product_data: {
          name: "Service Fee",
        },
        unit_amount: 10 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/payment-cancelled`,

      billing_address_collection: "required",
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName,
        customer_address: customerAddress,
      },
    });
    console.log("Stripe session created:", session.url);
    res.json({
      success: true,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Payment Success hone ke baad isPaid ko update karne ka function
const handlePaymentSuccess = async (req, res) => {
  console.log("Received session_id:", req.query.session_id);
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid session ID" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      console.log("Payment Successful for session:", session_id);

      const userId = req.userId;
      console.log("userId : ", userId);

      await cartModel.deleteMany({ userId });

      const appointment = await Appointment.findOne({ userId, isPaid: false });

      if (appointment) {
        await Appointment.updateOne(
          { userId, isPaid: false },
          { $set: { isPaid: true, receiptUrl: session.receipt_url, } }
        );
        console.log(`Appointment marked as paid for user ID: ${userId}`);
      }

      res.json({
        success: true,
        message: "Payment successful, cart cleared, appointment updated.",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment not completed." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { stripePayment, handlePaymentSuccess };
