import React, { useContext, useEffect, useState } from 'react'
import './Appointments.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Appointments = () => {

  const navigate = useNavigate()
  const {url, bookAppointment} = useContext(StoreContext)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    mobile: '',
    address: '',
    date: '',
    time: '',
  });

  const [availableTimes, setAvailableTimes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is filled correctly
    if (!formData.name || !formData.surname || !formData.email || !formData.mobile || !formData.address || !formData.date || !formData.time) {
      toast.error("Please fill in all fields.");
      return;
    }

    axios.post(`${url}/api/appoint/appointmentBook`, formData)
      .then(response => {
        // bookAppointment(response.data); // Set appointment data here
        bookAppointment({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          date: formData.date,
          time: formData.time,
        }); 
        toast.success("Appointment booked successfully")
        navigate('/cart')
      })
      .catch(err => console.error(err));
  };

  // Fetch available times for the selected date
  useEffect(() => {
    if (formData.date) {
      axios.get(`${url}/api/appoint/appointAvailable?date=${formData.date}`)
        .then(response => setAvailableTimes(response.data))
        .catch(err => console.error(err));
    }
  }, [formData.date]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Surname:</label>
      <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Mobile:</label>
      <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

      <label>Address:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} required />

      <label>Date:</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <label>Available Times:</label> {/* New label added */}
        {availableTimes.length > 0 ? (
          <div>
            {availableTimes.map((time) => (
              <button 
                key={time.slot} 
                type="button" 
                style={{ backgroundColor: time.available ? 'green' : 'red', color: 'white', marginRight: '10px', marginBottom: '10px' }}
                disabled={!time.available}
                onClick={() => setFormData({ ...formData, time: time.slot })}
              >
                {time.slot}
              </button>
            ))}
          </div>
          ) : (
            <p>Please select a date to view available times.</p>
          )}
      
      <button type="submit">Book Appointment</button>
    </form>
  )
}

export default Appointments