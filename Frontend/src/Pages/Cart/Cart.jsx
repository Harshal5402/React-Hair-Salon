import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, url, removeFromCart, appointment } = useContext(StoreContext);
  const navigate = useNavigate()

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    toast.success(`${item.name} removed successfully`);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className='cart'>
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

            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="list-table-format">
                  <img src={`${url}/images/` + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>{item.category}</p>
                  <p>&#8377; {item.price}</p>
                  <p onClick={() => handleRemoveFromCart(item)} className='cursor'>x</p>
                </div>
              ))
            )}
        </div>  

        <br />

        <div className="appointment-details">
          <h2>Appointment Details</h2>
          {appointment ? ( // Check if appointment exists
            <div className="appointment-info">
              <p><strong>Name:</strong> {appointment.name} {appointment.surname}</p>
              <p><strong>Email:</strong> {appointment.email}</p>
              <p><strong>Mobile:</strong> {appointment.mobile}</p>
              <p><strong>Address:</strong> {appointment.address}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
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
                <p>&#8377; {(totalPrice === 0 ? 0 : 2).toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>&#8377; {(totalPrice === 0 ? 0 : totalPrice + 2).toFixed(2)}</b>
              </div>
            </div>

            {appointment ? (
              <button onClick={() => navigate('/payment')}>Proceed to Pay</button>
            ) : (
              <button onClick={() => navigate('/appointments')}>Book Appointment</button>
            )}
          </div>
        </div>
      </div>
  );
}

export default Cart;
