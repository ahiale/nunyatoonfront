"use client";
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateParentState } from '@/store/slice';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function 
LoginForm() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const router = useRouter();
    const dispatch = useDispatch()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.target as HTMLFormElement);
        const rawFormData = {
          email: formData.get('mail') as string,
          password: formData.get('password') as string
        };
    
        try {
            const res = await fetch('http://localhost:8000/parent/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(rawFormData)
            });
            const data = await res.json();
            console.log(data)
            
            if (res.ok && data) {
                Cookies.set('token', data[1]); // Ensure 'token' is the correct key
                localStorage.setItem("token&Id", JSON.stringify(data));
                console.log(data[0].substring(3));
                const res = await fetch('http://localhost:8000/parent/get/'+data[0].substring(3), {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const parent = await res.json();
                console.log(parent)
                if(res.ok){
                    localStorage.setItem('connectedUser',JSON.stringify(parent))
                }
                router.push('/profil');
            } else {
                setError("Email ou mot de passe invalide."); // Set error message
            }
        } catch (error) {
            // Type assertion for the error object
            const errorMessage = (error as Error).message || "Erreur de connexion.";
            setError(`Erreur de connexion : ${errorMessage}`);
            console.log(error);
        }
    };

    return (
        <Provider store={store}>
        <form onSubmit={handleSubmit} className="login-form text-black">
            <div className="mb-4 relative">
                <input
                    type="email"
                    id="mail"
                    name="mail"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="mb-4 relative">
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
            <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-md py-2 px-4 w-full">Connexion</button>
        </form>
        </Provider>
    );
}
