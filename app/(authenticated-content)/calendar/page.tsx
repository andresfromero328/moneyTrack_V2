import React from "react";

import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import Calendar from "@/components/pages/calendar/calendarComps/Calendar";
import BillsBarChart from "@/components/pages/calendar/BillsBarChart";
import PendBillsRadialChart from "@/components/pages/calendar/PendBillsRadialChart";
import BillsBrkdDonutChart from "@/components/pages/calendar/BillsBrkdDonutChart";

const CalendarPage = () => {

  return (
    <StaggerAnimWrapper
      tag="main"
      style="w-full max-w-7xl mx-auto flex flex-col gap-5 p-5"
    >
      <h1>Calendar</h1>
      <Calendar />

      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-5">
        <BillsBarChart />
        <PendBillsRadialChart />
        <BillsBrkdDonutChart />
      </div>
    </StaggerAnimWrapper>
  );
};

export default CalendarPage;
