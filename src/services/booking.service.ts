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

async function getBookingById(bookingId: string) {
  try {
    const booking = await Booking.findById(bookingId);
    // console.log(booking);
    return booking;
  } catch (error) {
    throw new Error(`Greška prilikom pronalaženja rezevacije: ${error}`);
  }
}

async function updateBooking(id: string, updatedData: Partial<IBooking>) {
  try {
    const booking = await Booking.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return booking;
  } catch (error) {
    throw new Error(`Greška prilikom ažuriranja rezevacije: ${error}`);
  }
}

async function deleteBooking(id: string): Promise<void> {
  try {
    await Booking.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Greška prilikom brisanja rezevacije: ${error}`);
  }
}
async function createBooking(bookingData: IBooking): Promise<IBooking> {
  try {
    const newBooking = await Booking.create(bookingData);
    console.log(newBooking);
    return newBooking;
  } catch (error) {
    throw new Error(`Greška prilikom kreiranja rezevacije: ${error}`);
  }
}
export {
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  createBooking,
};
