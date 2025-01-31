import React, { useContext, useEffect, useState } from "react";
import "./FetchAppointment.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const FetchAppointment = () => {
  const { url, token, appointment, removeAppointment, FetchAppointment } =
    useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointment details
  const fetchAppointment = async () => {
    if (!token) {
      toast.error("Please login to view your appointment");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/appoint/fetchappointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Appointment Data:", response.data); // Debugging ke liye

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error("Error fetching appointment");
        setAppointments([]);
      }
    } catch (error) {
      toast.error("Failed to fetch appointment");
      setAppointments([]);
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
        fetchAppointment();
      } else {
        toast.error("Failed to remove appointment");
      }
    } catch (error) {
      toast.error("Error removing appointment");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointment();
    }
  }, [token]);

  return (
    <div className="fetch-details">
      <h2>Appointment Details</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment._id} className="fetch-info">
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
        ))
      ) : (
        <p>No appointment details available.</p>
      )}
    </div>
  );
};

export default FetchAppointment;
