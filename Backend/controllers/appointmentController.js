import Appointment from "../models/appointmentModel.js";

// Get available times for a selected date
const appointAvailable = async (req, res) => {
  const { date } = req.query;
  const appointments = await Appointment.find({ date });
  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const availableTimes = allTimes.map((time) => ({
    slot: time,
    available: !appointments.some((appointment) => appointment.time === time),
  }));

  res.json(availableTimes);
};

// Book appointment
const appointmentBook = async (req, res) => {
  const { name, surname, email, mobile, address, date, time } = req.body;
  const userId = req.userId;

  try {
    if (!userId) {
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
      status: "pending",
    });
    await appointment.save();

    // Emit real-time event to admin (socket.io)
    req.app.get("io").emit("new_appointment", appointment);

    res.json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

// Fetch the current user's appointment
const getAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const appointment = await Appointment.findOne({ userId, isPaid: false });
    if (!appointment) {
      return res.json({ success: false, message: "No appointment found" });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching appointment",
        error: error.message,
      });
  }
};

// User: Remove appointment (cancel + refund)
const appointmentRemove = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      userId,
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.status === "Cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Appointment is already cancelled" });
    }

    // Cancel and refund
    appointment.status = "Cancelled";
    appointment.refundStatus = "Refunded";
    appointment.cancelledBy = "User";

    await appointment.save();

    // Emit cancel event to admin
    req.app.get("io").emit("cancel_appointment", appointment);

    res.json({
      success: true,
      message: "Appointment cancelled successfully and refund initiated!",
      data: appointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error cancelling appointment",
        error: error.message,
      });
  }
};

// Admin: Update appointment status (approve/cancel/refund)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    if (!appointmentId || !status) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Appointment ID and status are required",
        });
    }

    let updateData = { status };

    // Agar refund ho raha hai to refundStatus bhi update karna
    if (status === "Refunded") {
      updateData.refundStatus = "Refunded";
    } else if (status === "Cancelled") {
      updateData.refundStatus = "Refund Initiated";
      updateData.cancelledBy = "Admin";
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

     // Emit status update to user side
     req.app.get("io").emit("appointment_status_updated", appointment);

    res.json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: appointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating appointment status",
        error: error.message,
      });
  }
};

// Fetch all user appointments (only paid)
const FetchAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const appointment = await Appointment.find({ userId, isPaid: true });

    if (!appointment || appointment.length === 0) {
      return res.json({ success: false, message: "No appointment found" });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching appointment",
        error: error.message,
      });
  }
};

// Fetch all admin appointments
const adminAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.find({ isPaid: true });

    if (!appointment || appointment.length === 0) {
      return res.json({ success: false, message: "No appointment found" });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching appointment",
        error: error.message,
      });
  }
};

// Admin: Remove appointment
const adminRemoveAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required" });
    }

    const appointmentData = await Appointment.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "No appointment found" });
    }

    res.json({ success: true, message: "Appointment removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error removing appointment",
        error: error.message,
      });
  }
};



export {
  appointAvailable,
  appointmentBook,
  appointmentRemove,
  getAppointment,
  FetchAppointment,
  adminAppointment,
  adminRemoveAppointment,
  updateAppointmentStatus,
};
