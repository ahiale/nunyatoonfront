"use client";
import Footer from "@/components/Footer";
import PrivateRoute from "@/components/privatedRouter";
import VideoPage from "@/components/videoPage";
import VideoPageParent from "@/components/videoPageParent";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Video() {
    return (
        
      <Provider store={store}>
        <PrivateRoute forAdmin={false}>
          <div>
            <VideoPageParent></VideoPageParent>
            <Footer/>
        </div>
        </PrivateRoute>
      </Provider>
        
        
    )
}
