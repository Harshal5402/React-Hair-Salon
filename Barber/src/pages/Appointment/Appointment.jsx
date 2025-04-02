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
      toast.error("Failed to fetch appointments");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Update Appointment Status
  const handleStatusChange = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `${url}/api/appoint/updateappointmentstatus`,
        {
          appointmentId,
          status,
        }
      );

      if (response.data.success) {
        toast.success(`Appointment updated to ${status}!`);

        // State me update karna
        setAppointments((prevAppointments) =>
          prevAppointments.map((appt) =>
            appt._id === appointmentId
              ? {
                  ...appt,
                  status,
                  refundStatus:
                    status === "Refunded" ? "Refunded" : appt.refundStatus,
                  cancelledBy:
                    status === "Cancelled" ? "Admin" : appt.cancelledBy,
                }
              : appt
          )
        );
      } else {
        toast.error("Failed to update appointment status");
      }
    } catch (error) {
      toast.error("Error updating appointment status");
      console.error(error);
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

            <p>
              <strong>Status:</strong> {appointment.status}
              {appointment.cancelledBy && (
                <span style={{ color: "red", marginLeft: "10px" }}>
                  (Cancelled by: {appointment.cancelledBy})
                </span>
              )}
            </p>

            {/* Refund Status Dikhane Ka Code */}
            {appointment.refundStatus && (
              <p>
                <strong>Refund Status:</strong>
                <span
                  style={{
                    color:
                      appointment.refundStatus === "Refunded" ? "green" : "red",
                    marginLeft: "5px",
                  }}
                >
                  {appointment.refundStatus}
                </span>
              </p>
            )}

            {/* Status Change Dropdown */}
            {appointment.refundStatus !== "Refunded" && (
              <p>
                <strong>Change Status:</strong>
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    handleStatusChange(appointment._id, e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                >
                  {appointment.status === "Refunded" ? null : (
                    <>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                      {appointment.status === "Cancelled" && (
                        <option value="Refunded">Refunded</option>
                      )}
                    </>
                  )}
                </select>
              </p>
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
        ))
      ) : (
        <p>No appointment details available.</p>
      )}
    </div>
  );
};

export default Appointment;
