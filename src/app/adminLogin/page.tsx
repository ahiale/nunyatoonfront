"use client";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import AdminLoginForm from "@/components/adminLoginForm";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const Adminlogin = () => {
  return (
    <Provider store={store}>
    <div
      className="flex justify-center items-center h-screen font-Grandstander"
      style={{
        backgroundImage: "url(/images/fondBleuNuit.jpg",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >


      <div className="w-1/3 h-auto hidden lg:block ">
        <img
          src="/images/login.png"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

       
      <div className="p-6 lg:p-10 md:p-10 sm:p-10 w-full lg:w-1/3 md:w-1/2 sm:w-2/3 bg-white h-auto rounded-lg shadow-lg ml-20">
     
        <h2 className="text-3xl mb-4 font-Grandstander font-bold text-blue-950 ">
          Admin Login
        </h2>
        <AdminLoginForm></AdminLoginForm>

      </div>
    </div>
    </Provider>
  );
};

export default Adminlogin;

