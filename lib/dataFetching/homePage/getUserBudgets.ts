import { connectDB } from "@/lib/mongodb";
import { Budget } from "@/models/models";
import { unstable_cache } from "next/cache";

const fetchUserBudgets = async (userID: string) => {
  try {
    await connectDB();

    const budgets = await Budget.find({
      userID: userID,
    });
    return budgets;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserBudgets = unstable_cache(
  async (userID: string) => fetchUserBudgets(userID),
  ["get-user-budgets"],
  { revalidate: 900, tags: ["get-user-budgets"] }
);
