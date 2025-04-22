"use server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
}
/**
 *
 * param: values RegisterFormData
 *
 * This server action receives the formData from the registration form and creates a user
 * in the database. Bcrypt is used to hash the password before storing it.
 *
 * return: null | mongoDB error
 */
export const register = async (values: RegisterFormData) => {
  const { email, password, name } = values;
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
  } catch (e) {
    console.log(e);
  }
};
