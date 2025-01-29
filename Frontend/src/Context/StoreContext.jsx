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

      
    
    // When booking an appointment, set the appointment details
    const bookAppointment = (appointmentData) => {
        setAppointment(appointmentData);
    };
  
    // Remove appointment on cart clear or other actions
    const removeAppointment = () => {
        setAppointment(null);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        console.log(storedToken); // Check if token is being set correctly
    }, []);
    
    const contextValue = {
        url,
        token,
        setToken,
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
