import React, { useContext, useState, useEffect } from "react";
import "./Appointments.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  const { url, token, bookAppointment } = useContext(StoreContext);
  console.log("Token from StoreContext:", token); // Token check
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null); // Track selected button
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    address: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Token on Submit:", token); // Token verify karna

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.address ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/appoint/appointmentBook`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointment Response:", response.data); // Response check

      if (response.data.success) {
        toast.success(response.data.message);
        bookAppointment(response.data.data);
        setFormData({
          name: "",
          surname: "",
          email: "",
          mobile: "",
          address: "",
          date: "",
          time: "",
        }); // Reset form

        // Redirect to cart page
        navigate("/cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in submitting appointment:", error);
      toast.error("Server error. Please try again.");
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData({ ...formData, time: time });
  };

  // Fetch available times for the selected date
  useEffect(() => {
    if (formData.date) {
      console.log("Token on Date Change:", token); // Token check

      axios
        .get(`${url}/api/appoint/appointAvailable?date=${formData.date}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        })
        .then((response) => {
          console.log("Available Times Response:", response.data); // Available times response
          setAvailableTimes(response.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch available times. Please try again.");
        });
    }
  }, [formData.date, url, token]);

  return (
    <div className="appointment">
      <h2>Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Last Name</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Available Times:</label>
          {availableTimes.length > 0 ? (
            <div>
              {availableTimes.map((time) => (
                <button
                  key={time.slot}
                  type="button"
                  style={{
                    backgroundColor: time.available ? "#8FBC8F" : "#E9967A",
                    color: "white",
                    marginRight: "10px",
                    width: "80px",
                    marginBottom: "10px",
                    border:
                      selectedTime === time.slot ? "2px solid #006400" : "none", // Red border for selected button
                    transition: "border 0.3s",
                  }}
                  disabled={!time.available}
                  onClick={() => handleTimeSelect(time.slot)}
                >
                  {time.slot}
                </button>
              ))}
            </div>
          ) : (
            <p>Please select a date to view available times.</p>
          )}
        </div>
        <button type="submit" className="btn-submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
