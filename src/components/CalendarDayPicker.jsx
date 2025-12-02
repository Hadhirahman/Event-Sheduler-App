// src/components/CalendarDayPicker.jsx
import React, { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parseISO, isValid } from "date-fns";
import { useSelector } from "react-redux";

/**
 * Self-contained calendar component.
 * Props:
 *  - events (optional) : array of events (each should have ._date or .date)
 *  - selectedDay (optional) : 'YYYY-MM-DD' or null
 *  - onDayClick (optional) : function(dateString|null)
 *
 * If events prop is not provided, this component will read from Redux store.events.list
 */
export default function CalendarDayPicker({ events: eventsProp = null, selectedDay = null, onDayClick = () => {} }) {
  // fallback to redux events if parent didn't pass events
  const storeEvents = useSelector((s) => s.events?.list || []);
  const source = eventsProp ?? storeEvents;

  // normalize to set of yyyy-MM-dd
  const eventDates = useMemo(() => {
    const s = new Set();
    for (const ev of source || []) {
      const raw = ev?._date ?? ev?.date ?? ev?.startDate ?? ev?.datetime ?? "";
      if (!raw) continue;
      let d = parseISO(String(raw));
      if (!isValid(d)) d = new Date(String(raw));
      if (!isValid(d)) continue;
      s.add(format(d, "yyyy-MM-dd"));
    }
    return s;
  }, [source]);

  // convert selectedDay to Date object for DayPicker's selected prop
  const selectedDateObj = useMemo(() => {
    if (!selectedDay) return undefined;
    const d = parseISO(selectedDay);
    return isValid(d) ? d : undefined;
  }, [selectedDay]);

  function renderDayContent(date) {
    const key = format(date, "yyyy-MM-dd");
    const hasEvent = eventDates.has(key);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span>{format(date, "d")}</span>
        {hasEvent && <span className="cal-dot" aria-hidden="true" />}
      </div>
    );
  }

  function handleDayClick(day) {
    if (!day) {
      onDayClick(null);
      return;
    }
    const key = format(day, "yyyy-MM-dd");
    // toggle selection
    if (selectedDay === key) onDayClick(null);
    else onDayClick(key);
  }

  return (
    <div className="p-4">
      <DayPicker
        mode="single"
        selected={selectedDateObj}
        onDayClick={handleDayClick}
        components={{
          DayContent: ({ date }) => renderDayContent(date),
        }}
      />
    </div>
  );
}
