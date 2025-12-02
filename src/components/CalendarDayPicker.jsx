// src/components/CalendarDayPicker.jsx
import React, { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parseISO, isValid } from "date-fns";
import { useDispatch, useSelector} from "react-redux";
import { setSelectedDate, clearSelectedDate } from "../utils/eventSlice";



export default function CalendarDayPicker({events}) {
 const highlite=events.map((ev) => ev.date.split("T")[0].split("-"))

 const dateObjects = highlite.map(d => 
  new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]))
);
console.log(dateObjects);

  const bookedDays = [
  new Date(2021, 5, 8),
  new Date(2021, 5, 9),
  new Date(2021, 5, 11),
];

console.log(new Date(2021, 5, 8));

const dispatch = useDispatch();



function handleDayClick(day) {
  if (!day) {
    dispatch(clearSelectedDate());
    return;
  }
  const key = format(day, "yyyy-MM-dd");
  if (selectedDay === key) {
    dispatch(clearSelectedDate());
    console.log(selectedDay);
    
  } else {
    dispatch(setSelectedDate(key));
  }
}

  return (
    <DayPicker
      defaultMonth={dateObjects[0]}
      modifiers={{booked: dateObjects,}}
      modifiersClassNames={{booked: "my-booked-class"}}
      onDayClick={handleDayClick}
      
      
    />
  );
}
