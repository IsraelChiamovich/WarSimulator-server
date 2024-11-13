// src/models/userModel.ts

import { Model, model, Schema, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  region?: string; // for IDF
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  region: { type: String },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
  }
  next();
});

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
