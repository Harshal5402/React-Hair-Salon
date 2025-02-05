import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  surname:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  mobile:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  date:{
    type: String, // Change date to string
    required: true,
    set: (val) => {
      // Ensure val is a valid Date object
      const date = new Date(val);
      // return date.toISOString().split("T")[0]; // Store only "YYYY-MM-DD"
      return date.toLocaleDateString('en-GB'); // English format (DD/MM/YYYY)
    },
  },
  time:{
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;