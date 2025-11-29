import React, { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parseISO } from "date-fns";

export default function CalendarDayPicker({ events = [], onDayClick }) {




  return (
    <div className="p-4">
      <DayPicker
        mode="single"
        modifiers=""
        modifiersClassNames=""
        onDayClick={onDayClick}
        components={{
          DayContent: ({ date }) => renderDayContent(date)
        }}
      />
    </div>
  );
}
