"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRestaurants = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurantById = exports.createRestaurant = void 0;
const restaurant_modal_1 = __importDefault(require("../models/restaurant.modal"));
async function getAllRestaurants() {
    try {
        const allRestaurants = await restaurant_modal_1.default.find();
        return allRestaurants;
    }
    catch (error) {
        throw new Error(`Greška prilikom dohvaćanja svih restorana: ${error}`);
    }
}
exports.getAllRestaurants = getAllRestaurants;
// CREATE funkcija
async function createRestaurant(restaurantData) {
    try {
        const newRestaurant = await restaurant_modal_1.default.create(restaurantData);
        return newRestaurant;
    }
    catch (error) {
        throw new Error(`Greška prilikom kreiranja restorana: ${error}`);
    }
}
exports.createRestaurant = createRestaurant;
// READ funkcija
async function getRestaurantById(restaurantId) {
    try {
        const restaurant = await restaurant_modal_1.default.findById(restaurantId);
        return restaurant;
    }
    catch (error) {
        throw new Error(`Greška prilikom pronalaženja restorana: ${error}`);
    }
}
exports.getRestaurantById = getRestaurantById;
// UPDATE funkcija
async function updateRestaurant(restaurantId, updatedData) {
    try {
        const restaurant = await restaurant_modal_1.default.findByIdAndUpdate(restaurantId, updatedData, { new: true });
        return restaurant;
    }
    catch (error) {
        throw new Error(`Greška prilikom ažuriranja restorana: ${error}`);
    }
}
exports.updateRestaurant = updateRestaurant;
// DELETE funkcija
async function deleteRestaurant(restaurantId) {
    try {
        await restaurant_modal_1.default.findByIdAndDelete(restaurantId);
    }
    catch (error) {
        throw new Error(`Greška prilikom brisanja restorana: ${error}`);
    }
}
exports.deleteRestaurant = deleteRestaurant;
//# sourceMappingURL=restaurant.service.js.map