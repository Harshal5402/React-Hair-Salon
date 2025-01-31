import React, { useContext, useEffect, useState } from "react";
import "./FetchAppointment.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const FetchAppointment = () => {
  const { url, token, appointment, removeAppointment, getAppointment } =
    useContext(StoreContext);

  // Fetch appointment details
  const fetchAppointment = async () => {
    if (!token) {
      toast.error("Please login to view your appointment");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/appoint/appointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        getAppointment(response.data.data);
      } else {
        toast.error("Error fetching appointment");
      }
    } catch (error) {
      toast.error("Failed to fetch appointment");
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

  useEffect(() => {
    if (token) {
      fetchAppointment();
    }
  }, [token]);

  return (
    <div className="fetch-details">
      <h2>Appointment Details</h2>
      {appointment ? ( // Check if appointment exists
        <div className="fetch-info">
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
        <p>No appointment details available.</p>
      )}
    </div>
  );
};

export default FetchAppointment;
