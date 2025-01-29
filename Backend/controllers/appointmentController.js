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
// const appointmentBook = async (req, res) => {
//     const { name, surname, email, mobile, address, date, time } = req.body;

//      // Check if the time slot is already booked
//     const existingAppointment = await Appointment.findOne({ date, time });
//      if (existingAppointment) {
//         return res.json({
//             success: false,
//             message: "Time slot is already booked" 
//         });
//     }

//     const appointment = new Appointment({ name, surname, email, mobile, address, date, time });
//     await appointment.save();
  
//     res.json({
//         success: true,
//         message: "Appointment booked successfully" 
//     });
// }


// Book appointment
const appointmentBook = async (req, res) => {
    console.log("Appointment API Called");  // Debugging Step 1
    console.log("Request Body:", req.body);  // Debugging Step 2

    const { name, surname, email, mobile, address, date, time } = req.body;
    const userId = req.userId; // Assuming user ID is extracted from the token

    console.log("User ID from Token:", userId);

    

    try {

        // Check if req.user is undefined or not
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
  
        // Check if the time slot is already booked
        const existingAppointment = await Appointment.findOne({ date, time });
        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "Time slot is already booked",
            });
        }

        // Save the appointment with userId
        const appointment = new Appointment({
            userId,
            name,
            surname,
            email,
            mobile,
            address,
            date,
            time,
        });
        await appointment.save();

        console.log("Appointment Saved Successfully");  // Debugging Step

        res.json({
            success: true,
            message: "Appointment booked successfully",
            data: appointment,
        });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
            error: error.message // Debugging ke liye
        });
    }
};


export {appointAvailable, appointmentBook}