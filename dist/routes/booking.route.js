"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
const booking_service_1 = require("../services/booking.service");
const BookingRoute = express_1.default.Router();
BookingRoute.get("/", async (req, res) => {
    try {
        const allBookings = await (0, booking_service_1.getAllBookings)();
        // console.log(allBookings);
        res.status(200).json(allBookings);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
BookingRoute.get("/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;
        // console.log(restaurantId);
        const booking = await (0, booking_service_1.getBookingById)(bookingId);
        if (!booking) {
            res.status(404).json({ error: "Rezevacija nije pronađen." });
        }
        else {
            res.status(200).json(booking);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
BookingRoute.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedBooking = await (0, booking_service_1.updateBooking)(id, updatedData);
        if (!updatedBooking) {
            res.status(404).json({ error: "Rezevacija nije pronađen." });
        }
        else {
            res.status(200).json(updatedBooking);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE ruta - DELETE /api/booking/:id
BookingRoute.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await (0, booking_service_1.deleteBooking)(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
BookingRoute.post("/", async (req, res) => {
    try {
        const newBookingData = req.body;
        console.log(newBookingData);
        const newBooking = await (0, booking_service_1.createBooking)(newBookingData);
        res.status(201).json(newBooking);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
BookingRoute.put("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(status, id);
        const booking = await booking_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!booking) {
            return res.status(404).json({ error: "Rezervacija nije pronađena." });
        }
        res.json(booking);
    }
    catch (error) {
        res.status(404).json({ error: "Booking not found" });
    }
});
exports.default = BookingRoute;
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
//# sourceMappingURL=booking.route.js.map