"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const user_route_1 = require("./routes/user.route");
const utils_1 = require("./utils");
const mongoose_1 = __importDefault(require("mongoose"));
const restaurant_route_1 = __importDefault(require("./routes/restaurant.route"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
(0, dotenv_1.configDotenv)();
app.use(utils_1.authenticateToken);
app.use("/api/restaurant", restaurant_route_1.default);
app.use("/api/user", user_route_1.UserRoute);
app.use("/api/booking", booking_route_1.default);
app.get("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date(),
    });
});
// if (app) console.log("Express server is running...");
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect("mongodb+srv://sale96jo:wAck9LE9VsYy2vJV@cluster0.j6scsem.mongodb.net/reservation", {});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log(`Connected to MongoDB on port: ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map