"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaKey, FaGlobe } from 'react-icons/fa';

const countryCodes: Record<string, string> = {
    Togo: "228",
    Benin: "229",
    Ghana: "233",
};

export default function RegisterForm() {
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [pays, setPays] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [codeParental, setCodeParental] = useState('');
    const [contactError, setContactError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [motDePasseError, setMotDePasseError] = useState('');
    const [motDePasseSuccess, setMotDePasseSuccess] = useState('');
    const [codeParentalError, setCodeParentalError] = useState('');
    const [codeParentalSuccess, setCodeParentalSuccess] = useState('');
    const [formError, setFormError] = useState('');
    const [serverError, setServerError] = useState('');
    const router = useRouter();

    const validateAge = (value: string) => {
        const ageValue = parseInt(value);
        if (isNaN(ageValue) || ageValue < 18) {
            setAgeError("Un parent doit avoir au moins 18 ans.");
        } else {
            setAgeError("");
        }
    };

    const validateMotDePasse = (value: string) => {
        const motDePasseRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!motDePasseRegex.test(value)) {
            setMotDePasseError("Le mot de passe doit contenir au moins 8 caractères, avec des chiffres et des lettres.");
            setMotDePasseSuccess("");
        } else {
            setMotDePasseError("");
            setMotDePasseSuccess("Mot de passe valide");
        }
    };

    const validateCodeParental = (value: string) => {
        const codeParentalRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        if (!codeParentalRegex.test(value)) {
            setCodeParentalError("Le code parental doit contenir au moins 4 caractères, avec des chiffres et des lettres.");
            setCodeParentalSuccess("");
        } else {
            setCodeParentalError("");
            setCodeParentalSuccess("Code parental valide");
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validation finale avant la soumission
        if (ageError || motDePasseError || codeParentalError) {
            setFormError("Veuillez corriger les erreurs avant de soumettre.");
            return;
        }

        setFormError(""); // Réinitialiser les erreurs du formulaire
        setServerError(""); // Réinitialiser les erreurs du serveur

        const formData = new FormData(event.target as HTMLFormElement);
        const rawFormData = {
            nom: formData.get('nom'),
            age: formData.get('age'),
            email: formData.get('email'),
            contact: formData.get('contact') || null, // Envoyer null si vide
            pays: formData.get('pays'),
            motDePasse: formData.get('motDePasse'),
            codeParental: formData.get('codeParental') || null, // Envoyer null si vide
        };

        try {
            const res = await fetch('http://localhost:8000/parent/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rawFormData)
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                router.push('/login');
            } else {
                const errorData = await res.json();
                // Afficher les messages d'erreur du serveur
                if (errorData.detail) {
                    if (errorData.detail.includes("email")) {
                        setServerError("Cet email est déjà utilisé, choississew en un autre");
                    } else if (errorData.detail.includes("contact")) {
                        setServerError("Ce contact est déjà utilisé, choisissew en un autre.");
                    } else {
                        setServerError("Une erreur s'est produite lors de l'inscription.");
                    }
                } else {
                    setServerError("Une erreur s'est produite lors de l'inscription.");
                }
            }
        } catch (error) {
            setServerError("Une erreur s'est produite lors de l'inscription.");
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
                            onChange={(e) => {
                                setAge(e.target.value);
                                validateAge(e.target.value); // Validation en temps réel
                            }}
                            required
                        />
                    </div>
                </div>
                {ageError && <div className="text-red-500 mb-2">{ageError}</div>}
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
                        <FaPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <div className="flex items-center">
                            <span className="px-4 py-2 border rounded-l-md bg-gray-200 text-gray-700">{countryCodes[pays] || "+"}</span>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                className="w-full px-4 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Numéro de téléphone"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                        {contactError && <div className="text-red-500 mb-2">{contactError}</div>}
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
                        <option value="">Sélectionner un pays</option>
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
                        onChange={(e) => {
                            setMotDePasse(e.target.value);
                            validateMotDePasse(e.target.value); // Validation en temps réel
                        }}
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        id="codeParental"
                        name="codeParental"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                        placeholder="Code parental"
                        value={codeParental}
                        onChange={(e) => {
                            setCodeParental(e.target.value);
                            validateCodeParental(e.target.value); // Validation en temps réel
                        }}
                        required
                    />
                </div>
                {/* Messages d'erreur et de succès */}
                <div className="mb-4">
                    {motDePasseError && <div className="text-red-500 mb-2">{motDePasseError}</div>}
                    {motDePasseSuccess && <div className="text-green-500 mb-2">{motDePasseSuccess}</div>}
                    {codeParentalError && <div className="text-red-500 mb-2">{codeParentalError}</div>}
                    {codeParentalSuccess && <div className="text-green-500 mb-2">{codeParentalSuccess}</div>}
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    {serverError && <div className="text-red-500 mb-2">{serverError}</div>}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Inscription
                </button>
            </form>
        </div>
    );
}
