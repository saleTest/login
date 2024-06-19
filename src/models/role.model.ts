import mongoose, { Schema, Document } from "mongoose";

interface IRole extends Document {
  role_name: string;
}

const roleSchema: Schema = new Schema({
  role_name: {
    type: String,
    required: true,
  },
});

// const Role = mongoose.model("Role", roleSchema);

// module.exports = Role;
const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
export type { IRole };
