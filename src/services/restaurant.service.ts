import Restaurant, { IRestaurant } from "../models/restaurant.modal";
async function getAllRestaurants(): Promise<IRestaurant[]> {
  try {
    const allRestaurants = await Restaurant.find();
    return allRestaurants;
  } catch (error) {
    throw new Error(`Greška prilikom dohvaćanja svih restorana: ${error}`);
  }
}
// CREATE funkcija
async function createRestaurant(
  restaurantData: IRestaurant
): Promise<IRestaurant> {
  try {
    const newRestaurant = await Restaurant.create(restaurantData);
    return newRestaurant;
  } catch (error) {
    throw new Error(`Greška prilikom kreiranja restorana: ${error}`);
  }
}

// READ funkcija
async function getRestaurantById(
  restaurantId: string
): Promise<IRestaurant | null> {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    return restaurant;
  } catch (error) {
    throw new Error(`Greška prilikom pronalaženja restorana: ${error}`);
  }
}

// UPDATE funkcija
async function updateRestaurant(
  restaurantId: string,
  updatedData: Partial<IRestaurant>
): Promise<IRestaurant | null> {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedData,
      { new: true }
    );
    return restaurant;
  } catch (error) {
    throw new Error(`Greška prilikom ažuriranja restorana: ${error}`);
  }
}

// DELETE funkcija
async function deleteRestaurant(restaurantId: string): Promise<void> {
  try {
    await Restaurant.findByIdAndDelete(restaurantId);
  } catch (error) {
    throw new Error(`Greška prilikom brisanja restorana: ${error}`);
  }
}

export {
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurants,
};
