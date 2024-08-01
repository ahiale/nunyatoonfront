"use client";
import Footer from "@/components/Footer";
import VideoPage from "@/components/videoPage";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Video() {
    return (
        
      <Provider store={store}>
          <div>
            <VideoPage/>
            <Footer/>
        </div>
      </Provider>
        
        
    )
}
