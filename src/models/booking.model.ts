import mongoose, { Schema, Document, Types } from "mongoose";

interface IBooking extends Document {
  name: string;
}

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  restoran: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // status: { type: String, default: "Obrada" },
  status: { type: String, default: "Pending" },
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
export type { IBooking };
