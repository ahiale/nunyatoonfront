"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import PrivateRoute from "@/components/privatedRouter";

const Login = () => {
  return (
    <Provider store={store}>
     
     <div className="flex justify-center items-center h-screen font-Grandstander text-black" style={{ backgroundImage: 'url(/images/fond.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

       {/* Back button */}
       <div className="absolute top-4 left-4">
        <Link href="/home" className="text-white text-2xl">
            <FaArrowLeft />
        </Link>
      </div>

      <div className="w-1/3 h-auto hidden lg:block ">
        <img
          src="/images/login.png"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

       
      <div className="p-6 lg:p-10 md:p-10 sm:p-10 w-full lg:w-1/3 md:w-1/2 sm:w-2/3 bg-white h-auto rounded-lg shadow-lg ml-20">
     
        <h2 className="text-3xl mb-4 font-Grandstander font-bold text-blue-950 ">
          SE CONNECTER
        </h2>
        <LoginForm />

        <div className="mt-2 mb-2 text-blue-500 text-center font-normal">
          <div className="flex justify-center space-x-4">
          <div  className="text-black">
              vous n'avez pas de compte?
            </div>
            <Link href="/register" className="text-purple-600 hover:text-purple-800">
              Creer un compte
            </Link>
            
          </div>
        </div>
      </div>
    </div>
   
    </Provider>
  );
};

export default Login;

