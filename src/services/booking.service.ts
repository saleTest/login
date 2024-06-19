import Booking, { IBooking } from "../models/booking.model";
import Restaurant from "../models/restaurant.modal";
// import Booking from "../models/restaurant.modal";

async function getAllBookings(): Promise<IBooking[]> {
  try {
    const allBookings = await Booking.find();
    return allBookings;
  } catch (error) {
    throw new Error(`Greška prilikom dohvaćanja svih restorana: ${error}`);
  }
}

export { getAllBookings };
