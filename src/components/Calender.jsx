import React, { useState } from "react";
import CalendarDayPicker from "../components/CalendarDayPicker";
import EventList from "../components/EventList";
import { dummyEvents } from "../data/dummyEvents";

export default function Calander() {
 
  return (
    <div className="p-4 ">
        <div className="h-[85vh] overflow-y-auto border rounded-lg p-3 bg-base-300 shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar column (separate) */}
        <div className=" rounded-lg border shadow p-2">
          <h2 className="text-lg font-semibold px-3 py-2">Calendar</h2>
          <CalendarDayPicker  />
        </div>

        {/* Event list column (scrollable card) */}
        <div className="md:flex-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">
               `Events on  : "All events
            </h2>
            <button className="btn btn-ghost">Show all</button>
          </div>
          <div className="h-[75vh] overflow-y-auto border rounded-lg  shadow-sm">
            <EventList  />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
