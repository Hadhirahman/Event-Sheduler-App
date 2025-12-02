import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventsReducer from "./eventSlice";


const appStore=configureStore({
    reducer:{
        user:userReducer,
        events:eventsReducer
    }
})

export default appStore;