import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'; 

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [appointment, setAppointment] = useState(() => {
        const savedAppointment = localStorage.getItem('appointment');
        return savedAppointment ? JSON.parse(savedAppointment) : null;
    });
    const url = "http://localhost:4000";
    const [token, setToken] = useState(""); 
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (service) => {
        setCart((prevCart) => {
            const itemExists = prevCart.some(item => item._id === service._id);
            
            if (!itemExists) {
                const updatedCart = [...prevCart, service];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                toast.success(`${service.name} added to cart!`);
                return updatedCart;
            } else {
                toast.warn(`${service.name} is already in the cart!`);
                return prevCart;
            }
        });
    };
    

    const removeFromCart = (itemToRemove) => {
        setCart((prevCart) => {
            console.log('Previous Cart:', prevCart);
            console.log('Item to Remove:', itemToRemove);
            
            // Filter out the item to remove
            const updatedCart = prevCart.filter(item => item._id !== itemToRemove._id);
            console.log('Updated Cart after removal:', updatedCart);
            
            // Update local storage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    
    // When booking an appointment, set the appointment details
    const bookAppointment = (appointmentData) => {
        setAppointment(appointmentData);
        localStorage.setItem('appointment', JSON.stringify(appointmentData));
    };
  
    // Remove appointment on cart clear or other actions
    const removeAppointment = () => {
        setAppointment(null);
        localStorage.removeItem('appointment');
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        cart,
        addToCart,
        removeFromCart,
        appointment,
        bookAppointment,
        removeAppointment,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
