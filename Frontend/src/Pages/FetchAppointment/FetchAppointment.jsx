import React, { useContext, useEffect, useState } from "react";
import "./FetchAppointment.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";

const FetchAppointment = () => {
  const { url, token } = useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointment details
  const fetchAppointment = async () => {
    if (!token) {
      toast.error("Please login to view your appointment");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/api/appoint/fetchappointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error("No appointment found");
        setAppointments([]);
      }
    } catch (error) {
      toast.error("Failed to fetch appointment");
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove Appointment
  const handleRemoveAppointment = async (appointment) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.put(
        `${url}/api/appoint/updateappointmentstatus`,
        {
          appointmentId: appointment._id,
          status: "Cancelled",
          cancelledBy: "User",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          "Appointment cancelled successfully! Refund will be initiated."
        );
        fetchAppointment();
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (error) {
      toast.error("Error cancelling appointment");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointment();
    }

    // Setup socket
    const socket = io(url);

    let userId = "";
    if (token) {
      try {
        const decode = jwtDecode(token);
        userId = decode.id || decode._id;
      } catch (error) {
        console.error("Failed to decode token: ", error);
      }
    }

    socket.on("appointment_status_updated", (data) => {
      if (data.userId === userId) {
        toast.info(`📢 Appointment ${data.status}`);
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === data._id ? { ...appointment, ...data } : appointment
          )
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <div className="fetch-details">
      <h2>All Appointments</h2>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div className="fetch-container" key={appointment._id}>
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
              <p>
                <strong>Status:</strong>
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
                {appointment.status === "Cancelled" &&
                  appointment.cancelledBy && (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      (Cancelled by: {appointment.cancelledBy})
                    </span>
                  )}
              </p>
              {appointment.status === "Cancelled" && (
                <p className="refund-text">Refund Initiated</p>
              )}
              {appointment.receiptUrl && (
                <p>
                  <strong>Receipt:</strong>
                  <a
                    href={appointment.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Payment Receipt
                  </a>
                </p>
              )}
            </div>
            <div className="actions">
              {appointment.status !== "Cancelled" &&
                appointment.status !== "Refunded" && (
                  <button
                    className="cancel-appointment"
                    onClick={() => handleRemoveAppointment(appointment)}
                  >
                    Cancel
                  </button>
                )}
            </div>
          </div>
        ))
      ) : (
        <p>No appointment details available.</p>
      )}
    </div>
  );
};

export default FetchAppointment;
