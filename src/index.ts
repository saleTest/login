import express from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { UserRoute } from "./routes/user.route";
import { authenticateToken } from "./utils";
import mongoose from "mongoose";
import RestaurantRoute from "./routes/restaurant.route";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

configDotenv();

app.use(authenticateToken);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/user", UserRoute);

app.get("*", (req, res) => {
  res.status(501).json({
    message: "NOT_IMPLEMENTED",
    timestamp: new Date(),
  });
});
// if (app) console.log("Express server is running...");
const PORT = process.env.PORT || 5000;
mongoose.connect(
  "mongodb+srv://sale96jo:wAck9LE9VsYy2vJV@cluster0.j6scsem.mongodb.net/reservation",
  {}
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));

db.once("open", () => {
  console.log(`Connected to MongoDB on port: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
