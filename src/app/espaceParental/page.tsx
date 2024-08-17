"use client";


import Dashboard from "@/components/dashboard";
import PrivateRoute from "@/components/privatedRouter";
import { store } from "@/store/store";
import { Provider } from "react-redux";



export default function EspaceParental() {
  return (
    
    <Provider store={store}>
      <PrivateRoute forAdmin={false}>
      <div>
       <Dashboard></Dashboard>
    </div>
    </PrivateRoute>
    </Provider> 
   
  );
}

