
import React, { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { filterEvent } from "../utils/eventSlice";

export default function CalendarDayPicker({ events }) {
  const dispatch = useDispatch();

 
  const highlight = useMemo(
    () => events.map((ev) => ev.date.split("T")[0].split("-")),
    [events]
  );

  const dateObjects = useMemo(
    () =>
      highlight.map(
        (d) => new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]))
      ),
    [highlight]
  );

  const filteredEvents = useSelector(
    (store) => store.events.filterList
  );

  function formatDateKey(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function handleDayClick(day) {
    const dateStr = formatDateKey(day); 
    dispatch(filterEvent(dateStr));
    
  }

  return (

      <DayPicker
        defaultMonth={dateObjects[0]}
        modifiers={{ booked: dateObjects }}
        modifiersClassNames={{ booked: "my-booked-class" }}
        onDayClick={handleDayClick}
      />
  );
}
