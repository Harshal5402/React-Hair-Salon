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
// const handlePaymentSuccess = async (req, res) => {
//   console.log("Received session_id:", req.query.session_id);
//   try {
//     const { session_id } = req.query;

//     if (!session_id) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid session ID" });
//     }

//     const session = await stripe.checkout.sessions.retrieve(session_id);
    

//     if (session.payment_status === "paid") {
//       console.log("Payment Successful for session:", session_id);

//       const userId = req.userId;
//       console.log("userId : ", userId);

//       // ✅ Fetch payment intent details
//       const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
//       const charges = paymentIntent.charges.data;

//       let receiptUrl = "";
//       if (charges.length > 0) {
//         receiptUrl = charges[0].receipt_url;  // ✅ Get receipt URL from charge
//       }

//       await cartModel.deleteMany({ userId });

//       const appointment = await Appointment.findOne({ userId, isPaid: false });

//       if (appointment) {
//         await Appointment.updateOne(
//           { userId, isPaid: false },
//           { $set: { isPaid: true, receiptUrl } }
//         );
//         console.log(`Appointment marked as paid for user ID: ${userId}`);
//       }

//       res.json({
//         success: true,
//         message: "Payment successful, cart cleared, appointment updated.",
//       });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Payment not completed." });
//     }
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// const handlePaymentSuccess = async (req, res) => {
//   console.log("Received session_id:", req.query.session_id);
//   try {
//     const { session_id } = req.query;

//     if (!session_id) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid session ID" });
//     }

//     const session = await stripe.checkout.sessions.retrieve(session_id);
//     console.log("Stripe session data:", JSON.stringify(session, null, 2));

//     if (session.payment_status === "paid") {
//       console.log("Payment Successful for session:", session_id);

//       const userId = req.userId;
//       console.log("userId:", userId);

//       if (!session.payment_intent) {
//         console.error("Missing payment_intent in session");
//         return res.status(400).json({ success: false, message: "Invalid payment intent" });
//       }

//       // ✅ Fetch payment intent details
//       const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
//       console.log("Payment Intent:", JSON.stringify(paymentIntent, null, 2));

//       if (!paymentIntent.charges || paymentIntent.charges.data.length === 0) {
//         console.error("No charges found in payment intent");
//         return res.status(400).json({ success: false, message: "No charges found" });
//       }

//       const receiptUrl = paymentIntent.charges.data[0].receipt_url || "";
//       console.log("Receipt URL:", receiptUrl);

//       await cartModel.deleteMany({ userId });

//       const appointment = await Appointment.findOne({ userId, isPaid: false });

//       if (appointment) {
//         await Appointment.updateOne(
//           { userId, isPaid: false },
//           { $set: { isPaid: true, receiptUrl } }
//         );
//         console.log(`Appointment marked as paid for user ID: ${userId}`);
//       }

//       res.json({
//         success: true,
//         message: "Payment successful, cart cleared, appointment updated.",
//       });
//     } else {
//       res.status(400).json({ success: false, message: "Payment not completed." });
//     }
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

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
    console.log("Stripe session data:", JSON.stringify(session, null, 2));

    if (session.payment_status === "paid") {
      console.log("Payment Successful for session:", session_id);

      const userId = req.userId;
      console.log("userId:", userId);

      if (!session.payment_intent) {
        console.error("Missing payment_intent in session");
        return res.status(400).json({ success: false, message: "Invalid payment intent" });
      }

      // ✅ Fetch payment intent details
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      console.log("Payment Intent:", JSON.stringify(paymentIntent, null, 2));

      // ✅ Manually get the charge ID
      const chargeId = paymentIntent.latest_charge;
      if (!chargeId) {
        console.error("No charge ID found in payment intent");
        return res.status(400).json({ success: false, message: "No charge found" });
      }

      // ✅ Fetch the charge separately
      const charge = await stripe.charges.retrieve(chargeId);
      const receiptUrl = charge.receipt_url || "";

      console.log("Receipt URL:", receiptUrl);

      await cartModel.deleteMany({ userId });

      const appointment = await Appointment.findOne({ userId, isPaid: false });

      if (appointment) {
        await Appointment.updateOne(
          { userId, isPaid: false },
          { $set: { isPaid: true, receiptUrl } }
        );
        console.log(`Appointment marked as paid for user ID: ${userId}`);
      }

      res.json({
        success: true,
        message: "Payment successful, cart cleared, appointment updated.",
        receiptUrl, // ✅ Sending receipt URL in response
      });
    } else {
      res.status(400).json({ success: false, message: "Payment not completed." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { stripePayment, handlePaymentSuccess };
