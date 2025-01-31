import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'; 

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // const [appointment, setAppointment] = useState(() => {
    //     const savedAppointment = localStorage.getItem('appointment');
    //     return savedAppointment ? JSON.parse(savedAppointment) : null;
    // });

    const [appointment, setAppointment] = useState(null);
    const url = "http://localhost:4000";
    const [token, setToken] = useState(""); 

      
    
    // When booking an appointment, set the appointment details
    const bookAppointment = (appointmentData) => {
        setAppointment(appointmentData);
    };

    // For fetching one appointment on cart
    const getAppointment = (appointmentData) => {
        setAppointment(appointmentData);
    }
  
    // Remove appointment on cart clear or other actions
    const removeAppointment = () => {
        setAppointment(null);
    };

    // // For fetching all the apppointments
    // const FetchAppointment = (appointmentData) => {
    //     setAppointment(appointmentData)
    // }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        console.log("Stored Token:", storedToken); 
    }, []);
    
    const contextValue = {
        url,
        token,
        setToken,
        appointment,
        bookAppointment,
        removeAppointment,
        getAppointment,
        // FetchAppointment,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
