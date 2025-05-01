"use server";
import { connectDB } from "@/lib/mongodb";
import { revalidateTag } from "next/cache";
import { CreateBudget } from "../types";
import { Budget } from "@/models/models";

/**
 *
 * @param name: string
 * @param amount: string
 * @param mCategory: string
 * @param sCategory: string
 * @param cCategory: string | null
 *
 * This server action receives the formData from the create budget form and creates a
 * budget in the database.
 *
 * return: CreateBudget object
 */
export const createBudget = async (
  prevState: CreateBudget,
  formData: FormData
): Promise<CreateBudget> => {
  // Variables
  const userID = formData.get("userID") as string;

  // Return userID is invalid or missing
  if (!userID) {
    return {
      success: false,
      message: "User ID is required",
      budget: prevState.budget,
    };
  }

  const data = {
    userID: formData.get("userID") as string,
    name: formData.get("budgetName")?.toString().toLowerCase(),
    amount: formData.get("budgetAmount")?.toString().toLowerCase(),
    mCategory: formData.get("mCategory")?.toString().toLowerCase(),
    sCategory: formData.get("sCategory")?.toString().toLowerCase(),
    cCategory: formData.get("cCategory")?.toString().toLowerCase(),
  };

  try {
    // Connect to DB
    await connectDB();

    const budgetFound = await Budget.findOne({
      userID: data.userID,
      budgetName: data.name,
    });

    if (budgetFound)
      return {
        success: false,
        message: "budget already exists",
        budget: prevState.budget,
      };

    await Budget.create({
      userID: data.userID,
      budgetName: data.name,
      budgetAmount: data.amount,
      mCategory: data.mCategory,
      sCategory: data.sCategory,
      cCategory: data.cCategory,
    });

    revalidateTag("get-user-budgets");
    
    return {
      success: true,
      message: "",
      budget: null,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error creating budget",
      budget: prevState.budget,
    };
  }
};
