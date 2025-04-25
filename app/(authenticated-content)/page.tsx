import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { CustomSession, OverviewTransaction } from "@/lib/types";
import { getPlaidAccessToken } from "@/lib/dataFetching/global/getPlaidAccessToken";

import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import Accounts from "@/components/pages/dashboard/accounts/Accounts";
import Budgets from "@/components/pages/dashboard/budgets/Budgets";
import SpendingAreaChart from "@/components/pages/dashboard/spending/SpendingAreaChart";
import Subscriptions from "@/components/pages/dashboard/subscriptions/Subscriptions";
import UpcomingBill from "@/components/pages/dashboard/upcomingBill/UpcomingBill";
import { redirect } from "next/navigation";
import { getUserAccounts } from "@/lib/dataFetching/homePage/getUserAccounts";
import { getUserSubscriptions } from "@/lib/dataFetching/homePage/getUserSubscriptions";
import { getUserSpending } from "@/lib/dataFetching/homePage/getUserSpending";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);

  // Checks
  if (!session || !session?.plaidLinked) redirect("/sign-in");

  // Get Access Token
  const token = await getPlaidAccessToken(session.userID);

  // Get Data
  const accounts = await getUserAccounts(token);
  const subscriptions = await getUserSubscriptions(accounts, token);
  const todayDate = new Date();
  const firstMonthDate = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    1
  );
  const { spending }: { spending: OverviewTransaction[] } =
    await getUserSpending(
      accounts,
      token,
      firstMonthDate.toISOString().slice(0, 10),
      todayDate.toISOString().slice(0, 10)
    );

  return (
    <StaggerAnimWrapper
      tag="main"
      style="w-full max-w-7xl mx-auto flex flex-col  gap-5 p-5"
    >
      <h1>Dashoboard</h1>

      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 gap-5">
        <SpendingAreaChart spending={spending} />
        <Accounts accounts={accounts} />
        <UpcomingBill />
        <Budgets />
        <Subscriptions subscriptions={subscriptions} />
      </div>
    </StaggerAnimWrapper>
  );
}
