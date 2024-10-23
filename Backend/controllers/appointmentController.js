import Appointment from "../models/appointmentModel.js";

// Get available times for a selected date
const appointAvailable = async (req, res) => {
    const { date } = req.query;
    const appointments = await Appointment.find({ date });
    const allTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

    const availableTimes = allTimes.map(time => ({
        slot: time,
        available: !appointments.some(appointment => appointment.time === time)
      }));
    
      res.json(availableTimes);
}

// Book appointment
const appointmentBook = async (req, res) => {
    const { name, surname, email, mobile, address, date, time } = req.body;

     // Check if the time slot is already booked
    const existingAppointment = await Appointment.findOne({ date, time });
     if (existingAppointment) {
        return res.json({
            success: false,
            message: "Time slot is already booked" 
        });
    }

    const appointment = new Appointment({ name, surname, email, mobile, address, date, time });
    await appointment.save();
  
    res.json({
        success: true,
        message: "Appointment booked successfully" 
    });
}

export {appointAvailable, appointmentBook}