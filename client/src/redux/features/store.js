import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        // mentor: mentorReducer,
    },
});