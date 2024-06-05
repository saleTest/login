import express, { Request, Response } from "express";
import {
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurants,
} from "../services/restaurant.service";
import { IRestaurant } from "../models/restaurant.modal";

const RestaurantRoute = express.Router();

RestaurantRoute.get("/", async (req: Request, res: Response) => {
  try {
    const allRestaurants = await getAllRestaurants();
    res.status(200).json(allRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// CREATE ruta - POST /api/restaurants
RestaurantRoute.post("/restaurants", async (req: Request, res: Response) => {
  try {
    const newRestaurantData: IRestaurant = req.body;
    const newRestaurant = await createRestaurant(newRestaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ruta - GET /api/restaurants/:id
RestaurantRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    console.log(restaurantId);
    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) {
      res.status(404).json({ error: "Restoran nije pronađen." });
    } else {
      res.status(200).json(restaurant);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE ruta - PUT /api/restaurants/:id
RestaurantRoute.put("/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updatedData: Partial<IRestaurant> = req.body;
    const updatedRestaurant = await updateRestaurant(restaurantId, updatedData);
    if (!updatedRestaurant) {
      res.status(404).json({ error: "Restoran nije pronađen." });
    } else {
      res.status(200).json(updatedRestaurant);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ruta - DELETE /api/restaurants/:id
RestaurantRoute.delete(
  "/restaurants/:id",
  async (req: Request, res: Response) => {
    try {
      const restaurantId = req.params.id;
      await deleteRestaurant(restaurantId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default RestaurantRoute;
