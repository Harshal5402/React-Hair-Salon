import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import serviceRouter from "./routes/serviceRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import cartRouter from "./routes/cartRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import accountRouter from "./routes/accountRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/service", serviceRouter);
app.use("/images", express.static("uploads"));
app.use("/api/appoint", appointmentRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", paymentRouter);
app.use("/api/account", accountRouter);
// app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// mongodb+srv://FoodDelivery:Food_Delivery@cluster0.r2h57.mongodb.net/?
