import express from "express";
import {
  appointAvailable,
  appointmentBook,
  appointmentRemove,
  getAppointment,
  FetchAppointment,
  adminAppointment,
  adminRemoveAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/auth.js";

const appointmentRouter = express.Router();

appointmentRouter.get("/appointAvailable", authMiddleware, appointAvailable);
appointmentRouter.post("/appointmentBook", authMiddleware, appointmentBook);
appointmentRouter.get("/getappointment", authMiddleware, getAppointment);
appointmentRouter.post("/appointmentRemove", authMiddleware, appointmentRemove);
appointmentRouter.get("/fetchappointment", authMiddleware, FetchAppointment);
appointmentRouter.get("/adminappointment", adminAppointment);
appointmentRouter.delete("/adminremoveappointment", adminRemoveAppointment);
appointmentRouter.put("/updateappointmentstatus", updateAppointmentStatus);

export default appointmentRouter;
