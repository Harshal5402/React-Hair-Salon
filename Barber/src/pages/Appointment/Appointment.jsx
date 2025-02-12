import React, { useContext, useEffect, useState } from "react";
import "./Appointment.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { url } = useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const allAppointments = async () => {
    try {
      const response = await axios.get(`${url}/api/appoint/adminappointment`);
      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error(response.data.message);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetching appointments");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove Appointment
  const handleRemoveAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `${url}/api/appoint/adminremoveappointment`,
        { data: { appointmentId } }
      );

      if (response.data.success) {
        toast.success("Appointment removed successfully!");
        allAppointments();
      } else {
        toast.error("Failed to remove appointment");
      }
    } catch (error) {
      toast.error("Error removing appointment");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    allAppointments();
  }, []);

  return (
    <div className="fetch-details">
      <h2>All Appointments</h2>
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
              onClick={() => handleRemoveAppointment(appointment._id)}
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

export default Appointment;
