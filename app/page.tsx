import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import Accounts from "@/components/pages/dashboard/accounts/Accounts";

export default function Home() {
  return (
    <StaggerAnimWrapper
      tag="main"
      style="w-full max-w-7xl mx-auto flex flex-col gap-5 p-5"
    >
      <h1>Dashoboard</h1>

      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 gap-5">
        {/* <SpendingAreaChart /> */}
        <Accounts />
        {/* <UpcomingBill /> */}
        {/* <Budgets /> */}
        {/* <Subscriptions /> */}
      </div>
    </StaggerAnimWrapper>
  );
}
