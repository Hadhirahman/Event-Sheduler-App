// src/components/EditEventForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants"; // make sure this is exported correctly
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvent } from "../utils/eventSlice";

export default function EditEventForm() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const events = useSelector((data) => data.events?.list || []);
  const event = events.find((e) => (e._id || e.id) === id) || null;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [mode, setMode] = useState("offline");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDate(event.date.split("T")[0] || "");
      setStartTime(event.startTime || "");
      setEndTime(event.endTime || "");
      setVenue(event.venue || "");
      setMode(event.mode || "offline");
      setDescription(event.description || "");
    } else {
      if (events.length > 0 && id) {
        setMessage("Event not found");
      } else {
        setMessage("Events not loaded in store yet.");
      }
    }
  }, [event, events, id]);


  const validate = () => {
    if (!title || !date || !startTime || !endTime) {
      setMessage("Please fill all required fields.");
      return false;
    }
    if (startTime >= endTime) {
      setMessage("Start time must be before end time.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    setMessage("");
    if (!validate()) return;

    if (!event) {
      setMessage("Event not available");
      return;
    }

    const eventData = {
      title,
      date,
      startTime,
      endTime,
      venue,
      mode,
      description,
    };

    setSaving(true);
    try {
    
      const res = await axios.put(`${BASE_URL}/event/${event._id || event.id}`, eventData, {
        withCredentials: true,
      });

      const saved = res.data.event ?? res.data.updated;
      dispatch(updateEvent(saved));
    
      
      setMessage(res.data.message || "Event updated successfully.");
    
    } catch (err) {
      console.error(err);
      const errMsg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Save failed";
      setMessage(errMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 w-full md:w-1/3 flex-none">
      <div className="card bg-base-300 text-primary-content shadow-lg rounded-lg h-[85vh] overflow-y-auto">
        <div className="card-body">
          <h2 className="card-title">EDIT EVENT</h2>

          {message && (
            <p className={`text-sm "text-green-500"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input w-full" placeholder="title" />

            <label className="label mt-2">
              <span className="label-text">Date before update: {date}</span>
            </label>
           
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="input w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <label className="label mt-2">
                  <span className="label-text">Start Time</span>
                </label>
                <input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" className="input w-full" />
              </div>
              <div>
                <label className="label mt-2">
                  <span className="label-text">End Time</span>
                </label>
                <input value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" className="input w-full" />
              </div>
            </div>

            <label className="label mt-2">
              <span className="label-text">Venue</span>
            </label>
            <input value={venue} onChange={(e) => setVenue(e.target.value)} type="text" className="input w-full" placeholder="eg: Main Hall, Zoom" />

            <label className="label mt-2">
              <span className="label-text">Mode</span>
            </label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="select w-full">
              <option>offline</option>
              <option>online</option>
            </select>

            <label className="label mt-2">
              <span className="label-text">Description</span>
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea w-full" placeholder="Description" />

            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
