"use client";
import Footer from "@/components/Footer";
import PrivateRoute from "@/components/privatedRouter";
import { ScreenTimeProvider } from "@/components/screenTimeProvider";
import VideoPage from "@/components/videoPage";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Video() {
    return (
        
      <Provider store={store}>
        <PrivateRoute forAdmin={false}>
        <ScreenTimeProvider>
          <div>
            <VideoPage/>
            <Footer/>
        </div>
        </ScreenTimeProvider>
        </PrivateRoute>
      </Provider>
        
        
    )
}
