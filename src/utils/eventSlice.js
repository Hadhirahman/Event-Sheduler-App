
import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    selectedDate:null
  },
  reducers: {
    setEvents(state, action) {
      state.list = action.payload;
    },
    addEvent(state, action) {
      state.list.push(action.payload);
    },
    clearEvents(state) {
      state.list = [];
    },
     updateEvent(state, action) {
    const updated = action.payload;
    const id = updated._id||updated.id
    state.list = state.list.map(event =>
      (event._id || event.id) === id ? updated : event
    );
  },

  deleteEvent(state,action){
     const id = action.payload;
  state.list = state.list.filter(
    (e) => (e._id || e.id) !== id
  );
    
  },


   setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },



    clearSelectedDate(state) {
      state.selectedDate = null;
    },
  },
});

export const { setEvents, addEvent, clearEvents ,updateEvent,deleteEvent,setSelectedDate,clearSelectedDate} = eventsSlice.actions;
export default eventsSlice.reducer;
