"use client";
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaKey, FaGlobe } from 'react-icons/fa';


export default function RegisterForm() {
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [pays, setPays] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [codeParental, setCodeParental] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const rawFormData = {
            nom: formData.get('nom'),
            age: formData.get('age'), 
            email: formData.get('email'),
            contact: formData.get('contact') || null, // Envoyer null si vide
            pays: formData.get('pays'),
            motDePasse: formData.get('motDePasse'),
            codeParental: formData.get('codeParental') || null, // Envoyer null si vide
          };
        console.log(JSON.stringify(rawFormData));
        
    
        try {
            console.log("1");
            const res = await fetch('http://localhost:8000/parent/create', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(rawFormData)
            });
            console.log(res);
            
            console.log("2")
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                router.push('/login');
            } else {
                throw new Error("Response not ok");
            }
        } catch (error) {
            alert("Login error: " + error);
            console.log(error);
        }
      };
    
    
    
    return (
        <div>


<form onSubmit={handleSubmit} className="">
                <div className="flex mb-4">
                    <div className="w-1/2 pr-2 relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-1/2 pl-2 relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="number"
                            id="age"
                            name="age"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                            placeholder="Âge"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-1/2 pl-2 relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                            placeholder="Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 relative">
                    <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        id="pays"
                        name="pays"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        required
                    >
                        <option value=""></option>
                        <option value="Togo">Togo</option>
                        <option value="Benin">Benin</option>
                        <option value="Ghana">Ghana</option>
                    </select>
                </div>
                <div className="mb-4 relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        id="motDePasse"
                        name="motDePasse"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                        placeholder="Mot de passe"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        id="codeParental"
                        name="codeParental"
                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                        placeholder="Code Parental"
                        value={codeParental}
                        onChange={(e) => setCodeParental(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-md py-2 px-4 w-full">
                    Inscription
                </button>
            </form>
        </div>
    );
}