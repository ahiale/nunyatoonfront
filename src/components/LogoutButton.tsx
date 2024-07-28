"use client";
import { redirect } from 'next/navigation';
import Cookies from "js-cookie";

function LogoutButton() {
    const handleLogout=() =>{
        Cookies.remove('token');
        redirect(`/home`) // Navigate to the new post page
    }
    return (
        <button className="text-black hover:underline" onClick={handleLogout}>Log Out</button>
    )
}
export default LogoutButton;
