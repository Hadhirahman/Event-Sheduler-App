import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent} from "../utils/eventSlice";
import { Link} from "react-router";


export default function EventList({events,error}) {

   const userData=useSelector((store)=>store.user);
  

  const isAdmin = useMemo(() => {
      return userData && userData.user.role === "admin";
    }, [userData]);

  const dispatch = useDispatch();

 
 
  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      const res = await axios.delete(
        `${BASE_URL}/${id}`,
        { withCredentials: true }
      );

      const deletedId = res.data.deleted?._id || id;

     
      dispatch(deleteEvent(deletedId));

      console.log("Deleted event:", deletedId);
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Delete failed"
      );
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 w-full">
        Error: {error}
        </div>
    );
  }

  if (!events || events.length === 0) {
    return <div className="p-4 text-center text-gray-500 w-full">No events.</div>;
  }

  return (
    <div className="space-y-3 p-3 ">
      {events.events.map((ev) => (
        <div key={ev._id} className="card border rounded-lg shadow-sm">
          <div className="card-body flex flex-col md:flex-row md:items-center">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-2xl">{ev.title}</h3>
              <div className="text-sm text-white-600">
                {ev.date ? new Date(ev.date).toDateString() : ""} · {ev.startTime} - {ev.endTime}
              </div>
              <div className="text-sm text-white-700 mt-1">{ev.description}</div>
              <span className="text-sm text-white hidden md:inline">{ev.venue}</span>
              <span className="badge badge-outline m-2">{ev.mode}</span>
            </div>
          {userData && isAdmin &&<div className="mt-3 md:mt-0 md:ml-4 flex items-center gap-2">
           <Link to={`/update/${ev._id}`}> <button className="badge bg-blue-600 ">edit</button></Link>
            <button className="badge bg-red-600 pointer-coarse:"  onClick={() => handleDelete(ev._id || ev.id)}>delete</button>
            </div>}
          </div>
        </div>
      ))}
    </div>
  );
}
