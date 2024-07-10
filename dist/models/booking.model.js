"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    restoran: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "restaurants",
        required: true,
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    // status: { type: String, default: "Obrada" },
    status: { type: String, default: "Pending" },
});
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
//# sourceMappingURL=booking.model.js.map