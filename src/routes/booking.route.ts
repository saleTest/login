import express, { Request, Response } from "express";
import { IBooking } from "../models/booking.model";
import { getAllBookings } from "../services/booking.service";

const BookingRoute = express.Router();

BookingRoute.get("/", async (req: Request, res: Response) => {
  try {
    const allBookings = await getAllBookings();
    // console.log(allBookings);
    res.status(200).json(allBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default BookingRoute;

// RestaurantRoute.get("/bookingsFe", async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.put("/bookings/:id/accept", async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status: "Accepted" },
//       { new: true }
//     );
//     res.json(booking);
//   } catch (error) {
//     res.status(404).json({ error: "Booking not found" });
//   }
// });

// app.put("/bookings/:id/reject", async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status: "Rejected" },
//       { new: true }
//     );
//     res.json(booking);
//   } catch (err) {
//     res.status(404).json({ error: "Booking not found" });
//   }
// });
