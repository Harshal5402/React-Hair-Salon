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
    console.log("Appointment API Called");  
    console.log("Request Body:", req.body);

    const { name, surname, email, mobile, address, date, time } = req.body;
    const userId = req.userId; 

    console.log("User ID from Token:", userId);

    

    try {
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
  
        const existingAppointment = await Appointment.findOne({ date, time });
        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "Time slot is already booked",
            });
        }

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

        console.log("Appointment Saved Successfully");  

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
            error: error.message 
        });
    }
};

// Fetch the current user's appointment
const getAppointment = async(req, res) => {
    try {
        const userId = req.userId;
        console.log("User ID from Token:", userId);

        const appointment = await Appointment.findOne({ userId, isPaid: false });  
        if (!appointment) {
            return res.json({ success: false, message: "No appointment found"});
        }

        res.json({ success: true, data: appointment});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching appointment", error: error.message});
    }
};

// Remove Appointment
const appointmentRemove = async (req, res) => {
    try {
        const userId = req.userId;
        const deletedAppointment = await Appointment.findOneAndDelete({userId});

        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: "No appointment found"});
        }

        res.json({ success: true, message: "Appointment removed successfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing appointment", error: error.message});
    }
};

// For fetching all appointments
const FetchAppointment = async(req, res) => {
    try {
        const userId = req.userId;
        console.log("User ID from Token:", userId);

        const appointment = await Appointment.find({ userId, isPaid: true }); 

        if (!appointment || appointment.length === 0) {
            return res.json({ success: false, message: "No appointment found"});
        }

        res.json({ success: true, data: appointment});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching appointment", error: error.message});
    }
};

const adminAppointment = async(req, res) => {
    try {
        
        const appointment = await Appointment.find({ isPaid: true }); 

        if (!appointment || appointment.length === 0) {
            return res.json({ success: false, message: "No appointment found"});
        }

        res.json({ success: true, data: appointment});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching appointment", error: error.message});
    }
};

const adminRemoveAppointment = async(req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        const appointmentData = await Appointment.findById(appointmentId);
        

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: "No appointment found"});
        }

        res.json({ success: true, message: "Appointment removed successfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing appointment", error: error.message});
    }
}

export {appointAvailable, appointmentBook, appointmentRemove, getAppointment, FetchAppointment, adminAppointment, adminRemoveAppointment};