import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password: string;
  email: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  resetRequestCount?: number;
  lastResetRequestAt?: Date;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value: string) {
        if (!value) return true;
        return /^\d+$/.test(value);
      },
      message: "Phone number must contain only digits",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  resetToken: String,
  resetTokenExpires: Date,
  resetRequestCount: { type: Number, default: 0 },
  lastResetRequestAt: Date,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
