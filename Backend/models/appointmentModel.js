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
    type: Date,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;