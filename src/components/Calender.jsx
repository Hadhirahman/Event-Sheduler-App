import React, { useEffect, useState } from "react";
import CalendarDayPicker from "../components/CalendarDayPicker";
import EventList from "../components/EventList";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../utils/eventSlice";
import { BASE_URL } from "../utils/constants";





export default function Calander() {
  const [error,setError]=useState("")
const dispatch=useDispatch()
  const events = useSelector((store) => store.events.list);
   const handleEvent = async () => {
       if (events && events.length > 0) {
      return;
       }
  
      try {
        const res = await axios.get(`${BASE_URL}/event`, { withCredentials: true });
        const data = Array.isArray(res.data) ? res.data : res.data.events ?? [];
        dispatch(setEvents(data));
      } catch (err) {
        console.error("fetch error:", err);
        setError(err?.response?.data?.message || err.message || "Failed to fetch events");
      }
    };
  
    useEffect(() => {
      handleEvent();
    }, [events]);


    
 
  return (
    <div className="p-4 ">
        <div className="h-[85vh] overflow-y-auto border rounded-lg p-3 bg-base-300 shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className=" rounded-lg border shadow p-2">
          <h2 className="text-lg font-semibold px-3 py-2">Calendar</h2>
          <CalendarDayPicker events={events} />
        </div>
        <div className="md:flex-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">
              "All events
            </h2>
          </div>
          <div className="h-[75vh] overflow-y-auto border rounded-lg  shadow-sm">
            <EventList events={{events,error}} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
