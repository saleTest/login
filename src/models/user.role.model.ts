import mongoose, { Schema, Document } from "mongoose";

interface IUserRole extends Document {
  user_id: mongoose.Types.ObjectId;
  role_id: mongoose.Types.ObjectId;
}

const userRoleSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

// const UserRole = mongoose.model("UserRole", userRoleSchema);

// module.exports = UserRole;

const UserRole = mongoose.model<IUserRole>("UserRole", userRoleSchema);

export default UserRole;
