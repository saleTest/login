"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_service_1 = require("../services/restaurant.service");
const RestaurantRoute = express_1.default.Router();
RestaurantRoute.get("/", async (req, res) => {
    try {
        const allRestaurants = await (0, restaurant_service_1.getAllRestaurants)();
        res.status(200).json(allRestaurants);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// CREATE ruta - POST /api/restaurants
RestaurantRoute.post("/", async (req, res) => {
    try {
        const newRestaurantData = req.body;
        const newRestaurant = await (0, restaurant_service_1.createRestaurant)(newRestaurantData);
        res.status(201).json(newRestaurant);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// READ ruta - GET /api/restaurants/:id
RestaurantRoute.get("/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;
        console.log(restaurantId);
        const restaurant = await (0, restaurant_service_1.getRestaurantById)(restaurantId);
        if (!restaurant) {
            res.status(404).json({ error: "Restoran nije pronađen." });
        }
        else {
            res.status(200).json(restaurant);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// UPDATE ruta - PUT /api/restaurants/:id
RestaurantRoute.put("/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const updatedData = req.body;
        const updatedRestaurant = await (0, restaurant_service_1.updateRestaurant)(restaurantId, updatedData);
        if (!updatedRestaurant) {
            res.status(404).json({ error: "Restoran nije pronađen." });
        }
        else {
            res.status(200).json(updatedRestaurant);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE ruta - DELETE /api/restaurants/:id
RestaurantRoute.delete("/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;
        await (0, restaurant_service_1.deleteRestaurant)(restaurantId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = RestaurantRoute;
//# sourceMappingURL=restaurant.route.js.map