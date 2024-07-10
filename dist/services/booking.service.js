"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = exports.deleteBooking = exports.updateBooking = exports.getBookingById = exports.getAllBookings = void 0;
const booking_model_1 = __importDefault(require("../models/booking.model"));
// import Booking from "../models/restaurant.modal";
async function getAllBookings() {
    try {
        const allBookings = await booking_model_1.default.find();
        return allBookings;
    }
    catch (error) {
        throw new Error(`Greška prilikom dohvaćanja svih restorana: ${error}`);
    }
}
exports.getAllBookings = getAllBookings;
async function getBookingById(bookingId) {
    try {
        const booking = await booking_model_1.default.findById(bookingId);
        // console.log(booking);
        return booking;
    }
    catch (error) {
        throw new Error(`Greška prilikom pronalaženja rezevacije: ${error}`);
    }
}
exports.getBookingById = getBookingById;
async function updateBooking(id, updatedData) {
    try {
        const booking = await booking_model_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        return booking;
    }
    catch (error) {
        throw new Error(`Greška prilikom ažuriranja rezevacije: ${error}`);
    }
}
exports.updateBooking = updateBooking;
async function deleteBooking(id) {
    try {
        await booking_model_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error(`Greška prilikom brisanja rezevacije: ${error}`);
    }
}
exports.deleteBooking = deleteBooking;
async function createBooking(bookingData) {
    try {
        const newBooking = await booking_model_1.default.create(bookingData);
        console.log(newBooking);
        return newBooking;
    }
    catch (error) {
        throw new Error(`Greška prilikom kreiranja rezevacije: ${error}`);
    }
}
exports.createBooking = createBooking;
//# sourceMappingURL=booking.service.js.map