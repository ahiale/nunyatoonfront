import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AppStateSlice } from "./slice";

const rootReducer= combineReducers({
    AppStates:AppStateSlice.reducer
});

export const store=configureStore({
    reducer:rootReducer,
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
