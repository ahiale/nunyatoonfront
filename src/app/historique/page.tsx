"use client";
import Footer from "@/components/Footer";
import HistoriqueComponent from "@/components/historiqueComponent";
import PrivateRoute from "@/components/privatedRouter";
import { ScreenTimeProvider } from "@/components/screenTimeProvider";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Historique() {
  return (
    <Provider store={store}>
      <PrivateRoute forAdmin={false}>
       
          <div>
            <div>
              <HistoriqueComponent></HistoriqueComponent>
            </div>
            <Footer />
          </div>
       
      </PrivateRoute>
    </Provider>
  );
}
