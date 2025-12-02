// src/components/CalendarDayPicker.jsx
import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parseISO, isValid } from "date-fns";

export default function CalendarDayPickercopy() {

  const DUMMY_EVENTS = [
    { id: 1, title: "Morning Meeting", date: "2025-12-01", time: "09:00–10:00" },
    { id: 2, title: "Design Review", date: "2025-12-01", time: "11:00–12:00" },
    { id: 3, title: "Client Call", date: "2025-12-02", time: "13:00–13:45" },
    { id: 4, title: "Workshop", date: "2025-12-05", time: "15:00–17:00" },
  ];


  const events = useMemo(() => {
    return DUMMY_EVENTS.map((ev) => {
      let d = parseISO(ev.date);
      if (!isValid(d)) d = new Date(ev.date);
      return { ...ev, _date: format(d, "yyyy-MM-dd") };
    });
  }, []);


  const eventDates = useMemo(() => new Set(events.map((e) => e._date)), [events]);

  const [selectedDate, setSelectedDate] = useState(null);


  const filteredEvents = useMemo(() => {
    if (!selectedDate) return events;
    return events.filter((ev) => ev._date === selectedDate);
  }, [events, selectedDate]);


  function renderDayContent(date) {
    const key = format(date, "yyyy-MM-dd");
    const hasEvent = eventDates.has(key);
    return (
      <div className="flex flex-col items-center">
        <span>{format(date, "d")}</span>
        {hasEvent && <span className="cal-dot" />}
      </div>
    );
  }


  function handleDayClick(day) {
    const key = format(day, "yyyy-MM-dd");
    setSelectedDate((prev) => (prev === key ? null : key));
  }

  return (
    <div className="p-4">

     
      <DayPicker
        mode="single"
        selected={selectedDate ? new Date(selectedDate) : undefined}
        onDayClick={handleDayClick}
        components={{
          DayContent: ({ date }) => renderDayContent(date),
        }}
      />

   
      <h2 className="text-lg font-semibold mt-4">
        {selectedDate ? `Events on ${selectedDate}` : "All Events"}
      </h2>

     
      <div className="mt-3 space-y-3">
        {filteredEvents.length === 0 && (
          <div className="text-gray-500">No events.</div>
        )}

        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="border rounded p-3 shadow-sm bg-white text-black"
          >
            <h3 className="font-semibold">{ev.title}</h3>
            <p className="text-sm">
              📅 {ev._date} &nbsp; ⏰ {ev.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
