import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, url, removeFromCart } = useContext(StoreContext);
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
                  <p>${item.price}</p>
                  <p onClick={() => handleRemoveFromCart(item)} className='cursor'>x</p>
                </div>
              ))
            )}
        </div>  

        <br />

        {/* <div className="cart-total">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div> */}

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Service Fee</p>
                <p>${(totalPrice === 0 ? 0 : 2).toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${(totalPrice === 0 ? 0 : totalPrice + 2).toFixed(2)}</b>
              </div>
            </div>
            <button onClick={() => navigate('/appointments')}>Book Appointment</button>
          </div>
        </div>
      </div>
  );
}

export default Cart;
