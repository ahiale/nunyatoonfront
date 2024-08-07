import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AppStateSlice } from "./slice";
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const rootReducer= combineReducers({
    AppStates:AppStateSlice.reducer
});


export const store=configureStore({
    reducer:rootReducer,
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState(store.getState());
  });
  
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
