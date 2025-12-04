
import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    filterList:[],
    selectedDay:undefined
  
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
filterEvent(state, action) {
  const selectDate = action.payload; // "YYYY-MM-DD"
  state.filterList = state.list.filter(
    (item) => item.date.split("T")[0] === selectDate
  );
},
addSelectDay(state,action){
state.selectedDay=action.payload
}

,clearFilter(state) {
  state.filterList = [];
  
}

  },
});

export const { setEvents, addEvent, clearEvents ,updateEvent,deleteEvent,filterEvent,  clearFilter,addSelectDay} = eventsSlice.actions;
export default eventsSlice.reducer;
