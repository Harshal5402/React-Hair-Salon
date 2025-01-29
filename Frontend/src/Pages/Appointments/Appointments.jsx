// import React, { useContext, useEffect, useState } from 'react'
// import './Appointments.css'
// import axios from 'axios'
// import { StoreContext } from '../../Context/StoreContext'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

// const Appointments = () => {

//   const navigate = useNavigate()
//   const {url, bookAppointment} = useContext(StoreContext)
//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     email: '',
//     mobile: '',
//     address: '',
//     date: '',
//     time: '',
//   });

//   const [availableTimes, setAvailableTimes] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if the form is filled correctly
//     if (!formData.name || !formData.surname || !formData.email || !formData.mobile || !formData.address || !formData.date || !formData.time) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     axios.post(`${url}/api/appoint/appointmentBook`, formData)
//       .then(response => {
//         // bookAppointment(response.data); // Set appointment data here
//         bookAppointment({
//           name: formData.name,
//           surname: formData.surname,
//           email: formData.email,
//           mobile: formData.mobile,
//           address: formData.address,
//           date: formData.date,
//           time: formData.time,
//         }); 
//         toast.success("Appointment booked successfully")
//         navigate('/cart')
//       })
//       .catch(err => console.error(err));
//   };

//   // Fetch available times for the selected date
//   useEffect(() => {
//     if (formData.date) {
//       axios.get(`${url}/api/appoint/appointAvailable?date=${formData.date}`)
//         .then(response => setAvailableTimes(response.data))
//         .catch(err => console.error(err));
//     }
//   }, [formData.date]);

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Name:</label>
//       <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//       <label>Surname:</label>
//       <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />

//       <label>Email:</label>
//       <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//       <label>Mobile:</label>
//       <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

//       <label>Address:</label>
//       <input type="text" name="address" value={formData.address} onChange={handleChange} required />

//       <label>Date:</label>
//       <input type="date" name="date" value={formData.date} onChange={handleChange} required />

//       <label>Available Times:</label> {/* New label added */}
//         {availableTimes.length > 0 ? (
//           <div>
//             {availableTimes.map((time) => (
//               <button 
//                 key={time.slot} 
//                 type="button" 
//                 style={{ backgroundColor: time.available ? 'green' : 'red', color: 'white', marginRight: '10px', marginBottom: '10px' }}
//                 disabled={!time.available}
//                 onClick={() => setFormData({ ...formData, time: time.slot })}
//               >
//                 {time.slot}
//               </button>
//             ))}
//           </div>
//           ) : (
//             <p>Please select a date to view available times.</p>
//           )}
      
//       <button type="submit">Book Appointment</button>
//     </form>
//   )
// }

// export default Appointments





// import React, { useContext, useState, useEffect } from "react";
// import "./Appointments.css";
// import { StoreContext } from "../../Context/StoreContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointment = () => {
//   const { url, token, setAppointment } = useContext(StoreContext); // Access context
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     mobile: "",
//     address: "",
//     date: "",
//     time: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.mobile ||
//       !formData.address ||
//       !formData.date ||
//       !formData.time
//     ) {
//       toast.error("Please fill out all fields");
//       return;
//     }

//     try {
//       const response = await axios.post(`${url}/api/appoint/appointmentBook`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         toast.success("Appointment booked successfully!");
//         setAppointment(response.data.data); // Update appointment in context
//         setFormData({
//           name: "",
//           surname: "",
//           email: "",
//           mobile: "",
//           address: "",
//           date: "",
//           time: "",
//         }); // Reset form
//       }
//     } catch (error) {
//       toast.error("Error booking appointment. Please try again.");
//     }
//   };

//   // Fetch available times for the selected date
//   useEffect(() => {
//     if (formData.date) {
//       axios.get(`${url}/api/appoint/appointAvailable?date=${formData.date}`)
//         .then(response => setAvailableTimes(response.data))
//         .catch(err => console.error(err));
//     }
//   }, [formData.date]);

//   return (
//     <div className="appointment">
//       <h2>Book an Appointment</h2>
//       <form className="appointment-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">First Name</label>
//           <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your first name" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="surname">Last Name</label>
//           <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} placeholder="Enter your last name" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="mobile">Mobile</label>
//           <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           {/* <label htmlFor="time">Time</label> */}
//           {/* <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required /> */}

//           <label>Available Times:</label> {/* New label added */}
//           {availableTimes.length > 0 ? (
//             <div>
//               {availableTimes.map((time) => (
//                 <button key={time.slot} type="button" style={{ backgroundColor: time.available ? 'green' : 'red', color: 'white', marginRight: '10px', marginBottom: '10px' }} disabled={!time.available} onClick={() => setFormData({ ...formData, time: time.slot })} >
//                   {time.slot}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p>Please select a date to view available times.</p>
//           )}
//         </div>
//         <button type="submit" className="btn-submit">
//           Book Appointment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Appointment;


import React, { useContext, useState, useEffect } from "react";
import "./Appointments.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { url, token, bookAppointment } = useContext(StoreContext);
  console.log("Token from StoreContext:", token);  // Token check
  const [availableTimes, setAvailableTimes] = useState([]);
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

    console.log("Token on Submit:", token);  // Token verify karna

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
      const response = await axios.post(`${url}/api/appoint/appointmentBook`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Appointment Response:", response.data);  // Response check

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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in submitting appointment:", error);
      toast.error("Server error. Please try again.");
    }
  };

  // Fetch available times for the selected date
  useEffect(() => {
    if (formData.date) {

      console.log("Token on Date Change:", token);  // Token check

      axios.get(`${url}/api/appoint/appointAvailable?date=${formData.date}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        })
        .then((response) => {
          console.log("Available Times Response:", response.data);  // Available times response
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
                    backgroundColor: time.available ? "green" : "red",
                    color: "white",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
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
        </div>
        <button type="submit" className="btn-submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
