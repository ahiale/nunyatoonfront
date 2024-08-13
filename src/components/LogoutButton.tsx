"use client";
import { redirect } from 'next/navigation';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

function LogoutButton() {
    const router=useRouter()
    const handleLogout=() =>{
        localStorage.removeItem('token&Id');
        localStorage.removeItem('connectedUser')
        router.push('/home');
    }
    return (
        <button className="text-white font-bold hover:text-white transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none" onClick={handleLogout}> Deconnexion </button>
    )
}
export default LogoutButton;
