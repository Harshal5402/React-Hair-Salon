import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { url, token, appointment, removeAppointment, getAppointment } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Remove item from cart
  const handleRemoveFromCart = async (item) => {
    console.log("Item to be removed:", item);
    try {
      const response = await axios.delete(`${url}/api/cart/items/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success("Item removed from cart!");
        setCartItems((prev) =>
          prev.filter((cartItem) => cartItem.id !== item.id)
        );
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      toast.error("Error removing item from cart");
    }
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!token) {
      toast.error("Please login to view your cart");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/cart/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response); // Log response from API

      if (response.data.success) {
        setCartItems(response.data.data); // Setting the fetched cart items
      } else {
        toast.error("Error fetching cart items");
      }
    } catch (error) {
      toast.error("Failed to fetch cart items");
    }
  };

  // Fetch appointment details
  const fetchAppointment = async () => {
    if (!token) {
      toast.error("Please login to view your appointment");
      getAppointment(null); // Reset appointment state
      return;
    }

    try {
      const response = await axios.get(`${url}/api/appoint/getAppointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.data.success) {
        getAppointment(response.data.data);
      } else {
        toast.error("No appointment found");
        getAppointment(null); // Reset appointment if not found
      }
    } catch (error) {
      toast.error("Failed to fetch appointment");
      getAppointment(null); // Reset appointment on error
    }
  };

  // Remove Appointment
  const handleRemoveAppointment = async () => {
    try {
      const response = await axios.delete(
        `${url}/api/appoint/appointmentRemove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Appointment removed successfully!");
        // Appointment stae ko null kar dena
        removeAppointment(null);
      } else {
        toast.error("Failed to remove appointment");
      }
    } catch (error) {
      toast.error("Error removing appointment");
    }
  };

  // Handle checkout button click
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${url}/api/checkout/create-payment`,
        {
          cartItems: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.image,
          })),
          totalPrice,
          customerName: `${appointment.name} ${appointment.surname}`,
          customerEmail: `${appointment.email}`,
          customerAddress: `${appointment.address}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        window.location.href = response.data.sessionUrl; // Redirect to Stripe Checkout page
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      toast.error("Error initiating checkout");
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalPrice(subtotal);
  };

  useEffect(() => {
    if (token) {
      fetchCartItems();
      fetchAppointment();
    }
  }, [token]);

  useEffect(() => {
    console.log("Updated Appointment State:", appointment);
  }, [appointment]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove</b>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.category}</p>
              <p>&#8377; {item.price}</p>
              <p onClick={() => handleRemoveFromCart(item)} className="cursor">
                x
              </p>
            </div>
          ))
        )}
      </div>

      <br />

      <div className="appointment-details">
        <h2>Appointment Details</h2>
        {appointment ? ( // Check if appointment exists
          <div className="appointment-info">
            <p>
              <strong>Name:</strong> {appointment.name} {appointment.surname}
            </p>
            <p>
              <strong>Email:</strong> {appointment.email}
            </p>
            <p>
              <strong>Mobile:</strong> {appointment.mobile}
            </p>
            <p>
              <strong>Address:</strong> {appointment.address}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <span
              className="remove-appointment"
              onClick={handleRemoveAppointment}
            >
              x
            </span>
          </div>
        ) : (
          <p>No appointment booked.</p>
        )}
      </div>

      <br />

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377; {totalPrice.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Service Fee</p>
              <p>&#8377; {(totalPrice === 0 ? 0 : 10).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                &#8377; {(totalPrice === 0 ? 0 : totalPrice + 10).toFixed(2)}
              </b>
            </div>
          </div>

          {appointment ? (
            // <button onClick={() => navigate('/payment')}
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0} // Disable if cart is empty
            >
              Proceed to Pay
            </button>
          ) : (
            <button onClick={() => navigate("/appointments")}>
              Book Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
