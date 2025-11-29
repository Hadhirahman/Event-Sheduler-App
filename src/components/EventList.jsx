import React from "react";

function formatDateTime(dateStrOrObj) {
  if (!dateStrOrObj) return "-";
  try {
    return new Date(dateStrOrObj).toLocaleString();
  } catch {
    return String(dateStrOrObj);
  }
}

export default function EventList({ events = [] }) {
  if (!events.length) {
    return <div className="p-4 text-center text-gray-500 w-full">No events.</div>;
  }

  return (
    <div className="space-y-3 p-3 ">
      {events.map(ev => (
        <div key={ev._id} className="card border rounded-lg shadow-sm">
          <div className="card-body flex flex-col md:flex-row md:items-center">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{ev.title}</h3>
              <div className="text-sm text-gray-600">
                {ev.date ? new Date(ev.date).toDateString() : ""} · {ev.startTime} - {ev.endTime}
              </div>
              <div className="text-sm text-gray-700 mt-1">{ev.description}</div>
            </div>
            <div className="mt-3 md:mt-0 md:ml-4 flex items-center gap-2">
              <span className="badge badge-outline">{ev.mode}</span>
              <span className="text-sm text-gray-500 hidden md:inline">{ev.venue}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
