import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { CustomSession, OverviewTransaction } from "@/lib/types";
import { getPlaidAccessToken } from "@/lib/dataFetching/global/getPlaidAccessToken";

import { getUserAccounts } from "@/lib/dataFetching/homePage/getUserAccounts";
import { getUserSpending } from "@/lib/dataFetching/homePage/getUserSpending";
import { getUserSubscriptions } from "@/lib/dataFetching/homePage/getUserSubscriptions";

import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import Accounts from "@/components/pages/dashboard/accounts/Accounts";
import Budgets from "@/components/pages/dashboard/budgets/Budgets";
import SpendingAreaChart from "@/components/pages/dashboard/spending/SpendingAreaChart";
import Subscriptions from "@/components/pages/dashboard/subscriptions/Subscriptions";
import UpcomingBill from "@/components/pages/dashboard/upcomingBill/UpcomingBill";
import { getUserNxtBill } from "@/lib/dataFetching/homePage/getUserNxtBill";

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
  const nxtBills = await getUserNxtBill(accounts, token, todayDate);

  return (
    <StaggerAnimWrapper
      tag="main"
      style="w-full max-w-7xl mx-auto flex flex-col  gap-5 p-5"
    >
      <h1>
        Dashoboard -{" "}
        {todayDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h1>

      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 gap-5">
        <SpendingAreaChart spending={spending} />
        <Accounts accounts={accounts} />
        <UpcomingBill nxtBills={nxtBills} />
        <Budgets />
        <Subscriptions subscriptions={subscriptions} />
      </div>
    </StaggerAnimWrapper>
  );
}
