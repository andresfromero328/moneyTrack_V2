"use client";

import React, { useState } from "react";

import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <>
      <div
        id="bill-calendar-container"
        className="flex flex-col gap-2 w-full max-w-full h-[570px] overflow-visible"
      >
        <CalendarHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div
          id="bill-calendar-view-container"
          className="calendar-view mt-1 flex-1"
        >
          <MonthView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            // setShowModal={setShowModal}
          />
        </div>
      </div>
      <h2 className="mt-5">
        {selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}{" "}
        - Bills Report
      </h2>
    </>
  );
};

export default Calendar;
