import React, { useState } from "react";

function EventForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [mode, setMode] = useState("Offline");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!title || !date || !startTime || !endTime) {
      setMessage("Please fill all required fields.");
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

    // send data to parent if provided
    if (onSave) {
      onSave(eventData);
    }
    console.log(eventData);
    
    // show success message
    setMessage("Event saved successfully!");

    // clear form
    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setVenue("");
    setMode("Offline");
    setDescription("");
  };

  return (
    <div className="p-4 w-full md:w-1/3 flex-none">
      <div className="card bg-base-300 text-primary-content shadow-lg rounded-lg h-[85vh] overflow-y-auto">
        <div className="card-body">
          <h2 className="card-title">EVENT</h2>

          {message && <p className="text-sm text-green-500">{message}</p>}

          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="input w-full"
            placeholder="title"
          />

          <label className="label mt-2">
            <span className="label-text">Date</span>
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="input w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div>
              <label className="label mt-2">
                <span className="label-text">Start Time</span>
              </label>
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
                className="input w-full"
              />
            </div>
            <div>
              <label className="label mt-2">
                <span className="label-text">End Time</span>
              </label>
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
                className="input w-full"
              />
            </div>
          </div>

          <label className="label mt-2">
            <span className="label-text">Venue</span>
          </label>
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            type="text"
            className="input w-full"
            placeholder="eg: Main Hall, Zoom"
          />

          <label className="label mt-2">
            <span className="label-text">Mode</span>
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="select w-full"
          >
            <option>Offline</option>
            <option>Online</option>
          </select>

          <label className="label mt-2">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea w-full"
            placeholder="Description"
          />

          <div className="card-actions justify-end mt-4">
            <button onClick={handleSubmit} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
