
import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/registerForm';
import { FaArrowLeft } from 'react-icons/fa';

const Register = () => {

  return (
    <div className="flex justify-center items-center h-screen font-Grandstander text-black" style={{ backgroundImage: 'url(/images/fond.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Back button */}
        <div className="absolute top-4 left-4">
        <Link href="/home" className="text-white text-2xl">
            <FaArrowLeft />
        </Link>
      </div>
      <div className="w-1/3 h-screen hidden lg:block">
        <img src="/images/register.png" alt="Placeholder Image" className="object-cover w-full h-full" />
      </div>

      <div className="p-6 lg:p-10 md:p-10 sm:p-10 w-full lg:w-1/3 md:w-1/2 sm:w-2/3 bg-white h-auto rounded-lg shadow-lg ml-20">
        <h2 className="text-3xl mb-2 font-Grandstander  font-bold text-blue-900">CRÉER UN COMPTE</h2>
        <RegisterForm />

        <div className="mt-3 text-black text-center">
          <Link href="/login" className="text-purple-500 hover:text-purple-800"> se connecter </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
