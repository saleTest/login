import express, { Request, Response } from "express";
import Booking, { IBooking } from "../models/booking.model";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "../services/booking.service";

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

BookingRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    // console.log(restaurantId);
    const booking = await getBookingById(bookingId);
    if (!booking) {
      res.status(404).json({ error: "Rezevacija nije pronađen." });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

BookingRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData: Partial<IBooking> = req.body;
    const updatedBooking = await updateBooking(id, updatedData);
    if (!updatedBooking) {
      res.status(404).json({ error: "Rezevacija nije pronađen." });
    } else {
      res.status(200).json(updatedBooking);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ruta - DELETE /api/booking/:id
BookingRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteBooking(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

BookingRoute.post("/", async (req: Request, res: Response) => {
  try {
    const newBookingData: IBooking = req.body;
    console.log(newBookingData);

    const newBooking = await createBooking(newBookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

BookingRoute.put("/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status, id);
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: "Rezervacija nije pronađena." });
    }
    res.json(booking);
  } catch (error) {
    res.status(404).json({ error: "Booking not found" });
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
