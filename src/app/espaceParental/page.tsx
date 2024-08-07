"use client";


import Dashboard from "@/components/dashboard";
import { store } from "@/store/store";
import { Provider } from "react-redux";



export default function EspaceParental() {
  return (
    
    <Provider store={store}>
      <div>
       <Dashboard></Dashboard>
    </div>
    </Provider> 
   
  );
}

