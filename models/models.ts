import { BudgetDocument, UserDocument } from "@/lib/types";
import mongoose, { model, Schema } from "mongoose";

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

const BudgetSchema = new Schema<BudgetDocument>({
  userID: {
    type: String,
    unique: false,
    required: true,
  },
  budgetName: {
    type: String,
    unique: true,
    required: true,
  },
  budgetAmount: {
    type: Number,
    required: true,
  },
  mCategory: {
    type: String,
    required: true,
  },
  sCategory: {
    type: String,
  },
  cCategory: {
    type: String,
  },
});

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
const Budget =
  mongoose.models?.Budget || model<BudgetDocument>("Budget", BudgetSchema);
export { User, Budget };
