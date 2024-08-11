"use client";
import Footer from "@/components/Footer";
import VideoPage from "@/components/videoPage";
import VideoPageParent from "@/components/videoPageParent";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Video() {
    return (
        
      <Provider store={store}>
          <div>
            <VideoPageParent></VideoPageParent>
            <Footer/>
        </div>
      </Provider>
        
        
    )
}
