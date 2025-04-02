import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [appointment, setAppointment] = useState(null);

  const url = "https://react-hair-salon-backend.onrender.com";
  // const url = "http://localhost:4000";
  
  // const [token, setToken] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // When booking an appointment, set the appointment details
  const bookAppointment = (appointmentData) => {
    setAppointment(appointmentData);
  };

  // For fetching one appointment on cart
  const getAppointment = (appointmentData) => {
    setAppointment(appointmentData);
  };

  // Remove appointment on cart clear or other actions
  const removeAppointment = () => {
    setAppointment(null);
  };

  const loadUserProfileData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${url}/api/user/getProfile`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
      });

      console.log(data); 

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log("Stored Token:", storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const contextValue = {
    url,
    token,
    setToken,
    appointment,
    bookAppointment,
    removeAppointment,
    getAppointment,
    userData,
    setUserData,
    loadUserProfileData
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
