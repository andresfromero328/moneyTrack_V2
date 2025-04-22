import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  image: string;
  isOAuth: boolean;
  plaidLinked: boolean;
  plaidAccessToken: string;
  plaidItemID: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "credentials - Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.isOAuth;
      },
    },
    isOAuth: { type: Boolean, default: false },
    name: {
      type: String,
      required: [true, "credentials - Name is required"],
    },
    image: {
      type: String,
      default: null,
    },
    plaidLinked: {
      type: Boolean,
      default: false,
    },
    plaidAccessToken: {
      type: String,
      default: null,
    },
    plaidItemID: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);

export { User };
