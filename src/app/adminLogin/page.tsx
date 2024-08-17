"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AdminLoginForm from "@/components/adminLoginForm";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const Adminlogin = () => {
  return (
    <Provider store={store}>
      <div
        className="bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75 h-screen flex items-center justify-center"
      >
        <div className="p-6 lg:p-10 md:p-10 sm:p-10 w-full lg:w-1/3 md:w-1/2 sm:w-2/3 bg-white h-auto rounded-lg shadow-lg">
          <h2 className="text-3xl mb-4 font-Grandstander font-bold text-blue-950 text-center">
            Connexion de l'Admin
          </h2>
          <AdminLoginForm />
        </div>
      </div>
    </Provider>
  );
};

export default Adminlogin;
