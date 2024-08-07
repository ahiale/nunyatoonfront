"use client";
import Footer from "@/components/Footer";
import HistoriqueComponent from "@/components/historiqueComponent";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const videoList = [
  {
    title: 'Video 1',
    content: 'https://www.example.com/video1.mp4',
    date: '2024-07-01',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },

 
];

export default function Historique() {
  return (
    <Provider store={store}>
<div>
    <div>
      <HistoriqueComponent></HistoriqueComponent>
    </div>
    <Footer />
      </div>
      </Provider>
   
      
    
  );
}
