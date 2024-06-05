import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  location: string;
  price: number;
  image: string;
  details: string;
  rating: number;
  views: number;
  description: string;
  latitude: number;
  longitude: number;
  // markers: Types.ObjectId[];
}

const restaurantSchema: Schema = new Schema({
  name: String,
  location: String,
  price: Number,
  image: String,
  details: String,
  rating: Number,
  views: Number,
  description: String,
  latitude: Number,
  longitude: Number,
  // markers: [{ type: Schema.Types.ObjectId, ref: "Marker" }],
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
