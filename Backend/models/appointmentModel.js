import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    mobile: String,
    address: String,
    date: String,
    time: String
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);

  export default Appointment