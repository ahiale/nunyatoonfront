"use client";
import Footer from '@/components/Footer';
import VoirProfil from '@/components/voirProfil';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSignOutAlt, FaUser, FaEllipsisV, FaTrash, FaHistory } from 'react-icons/fa';

interface Profile {
  pseudo?: string;
  image?: string;
  editPseudo?: string;
  editImage?: string;
  id?: string;
  age?: string;
  code_pin?: string;
  editAge?: string;
  editPin?: string;
}

interface Parent {
  id:string;
  nom: string;
  email: string;
}

const defaultParent : Parent = {
id : "",
nom:"",
email : ""
} 


// const profiles: Profile[] = [
//   { name: 'Profil Enfant 1', image: '/images/control.png' },
//   { name: 'Profil Enfant 2', image: '/path/to/child2-profile.jpg' },
//   { name: 'Profil Enfant 3', image: '/path/to/child3-profile.jpg' },
// ];

const ProfileCard = ({ pseudo, image, onEdit, onDelete, onHistory, readProfile }: Profile & { onEdit: () => void; onDelete: () => void; onHistory: () => void;  readProfile: () => void}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative bg-white p-4 rounded-lg">
      <div className="flex items-center space-x-4" onClick={() => setShowOptions(!showOptions)}>
        <img src={image} alt={`${name} Profile`} className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="text-black text-lg">{pseudo}</h3>
        </div>
        <FaEllipsisV className="text-black cursor-pointer ml-auto" />
      </div>
      {showOptions && (
        <div className="mt-2 rounded-md p-2">
          <button onClick={readProfile} className="block px-4 py-2 text-black hover:bg-yellow-700 w-full text-left">
            <FaHistory className="mr-2" /> Voir le profil
          </button>
          <button onClick={onEdit} className="block px-4 py-2 text-black hover:bg-yellow-700 w-full text-left">
            <FaEdit className="mr-2" /> Modifier
          </button>
          <button onClick={onDelete} className="block px-4 py-2 text-black hover:bg-yellow-700 w-full text-left">
            <FaTrash className="mr-2" /> Supprimer
          </button>
          <button onClick={onHistory} className="block px-4 py-2 text-black hover:bg-yellow-700 w-full text-left">
            <FaHistory className="mr-2" /> Historique
          </button>
        </div>
      )}
    </div>
  );
};

const ProfileForm = ({ onClose, onSubmit, initialProfile, loggedParentId }: { onClose: () => void; onSubmit: (profile: Profile) => void; initialProfile?: Profile, loggedParentId?: string }) => {
  const [pseudo, setPseudo] = useState(initialProfile?.pseudo || '');
  const [image, setImage] = useState(initialProfile?.image || '');
  const [age, setAge] = useState('');
  const [pin, setPin] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [parentalCode, setParentalCode] = useState('');

  const handleDaysChange = (day: string) => {
    setDays((prevDays) => (prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]));
  };

  const handleSubmit = async () => {
    onSubmit({ pseudo, image });
    onClose();

    try {
      // Créer l'enfant
      const enfantResponse = await fetch('http://localhost:8000/enfant/createEnfant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo,
          age,
          image_profil: image,
          code_pin: pin,
          parent_id: loggedParentId, // Utilisez l'ID du parent récupéré
        }),
      });
  
      if (!enfantResponse.ok) {
        throw new Error('Erreur lors de la création de l\'enfant');
      }
  
      const enfant = await enfantResponse.json();
      console.log("Informations de l'enfant :", enfant);
      
      const enfant_id = enfant[0].id;
      console.log("ID de l'enfant :", enfant_id);
  
      // Créer le temps d'écran
      const tempsEcranResponse = await fetch('http://localhost:8000/tempsEcran/CreateTempsEcran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heuresD: startTime,
          heuresF: endTime,
          joursA: days,
          enfant_id: enfant_id,
        }),
      });

      console.log(JSON.stringify({
        heuresD: startTime,
        heuresF: endTime,
        joursA: days,
        enfant_id: enfant_id,
      }));
  
      if (!tempsEcranResponse.ok) {
        throw new Error('Erreur lors de la création du temps d\'écran');
      }
  
      console.log('Enfant et temps d\'écran créés avec succès');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl mb-4"></h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm" >pseudooo</label>
            <input className="w-full p-2 border rounded" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Image Profil</label>
            <input type="file" className="w-full p-2 border rounded" onChange={(e) => setImage(URL.createObjectURL(e.target.files?.[0]!))} />
          </div>
          {initialProfile ? (
            <>
              <div>
                <label className="block text-sm">Age</label>
                <input type="number" className="w-full p-2 border rounded" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Code PIN</label>
                <input type="password" className="w-full p-2 border rounded" value={pin} onChange={(e) => setPin(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Jours de connexion</label>
                <div className="flex flex-wrap gap-2">
                  {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((day) => (
                    <button
                      key={day}
                      className={`p-2 border rounded ${days.includes(day) ? 'bg-yellow-700' : 'bg-white'}`}
                      onClick={() => handleDaysChange(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm">Heure de début</label>
                  <input type="time" className="w-full p-2 border rounded" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm">Heure de fin</label>
                  <input type="time" className="w-full p-2 border rounded" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
            </>
          ) : (
            <>
              
              
              <div>
                <label className="block text-sm">Age</label>
                <input type="number" className="w-full p-2 border rounded" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Code PIN</label>
                <input type="password" className="w-full p-2 border rounded" value={pin} onChange={(e) => setPin(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Jours de connexion</label>
                <div className="flex flex-wrap gap-2">
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                    <button
                      key={day}
                      className={`p-2 border rounded ${days.includes(day) ? 'bg-yellow-700' : 'bg-white'}`}
                      onClick={() => handleDaysChange(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm">Heure de début</label>
                  <input type="time" className="w-full p-2 border rounded" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm">Heure de fin</label>
                  <input type="time" className="w-full p-2 border rounded" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-4 mt-4">
          <button onClick={handleSubmit} className="p-2 bg-yellow-700 rounded">Enregistrer</button>
          <button onClick={onClose} className="p-2 bg-gray-400 rounded">Annuler</button>
        </div>
      </div>
    </div>
  );
};

const ProfileEditForm = ({ onClose, onSubmit, initialProfile }: { onClose: () => void; onSubmit: (profile: Profile) => void; initialProfile?: Profile }) => {
  const [editPseudo, setEditPseudo] = useState(initialProfile?.pseudo || '');
  const [editImage, setEditImage] = useState(initialProfile?.image || '');
  const [editAge, setEditAge] = useState(initialProfile?.age || '');
  const [editPin, setEditPin] = useState(initialProfile?.code_pin || '');
  const [editDays, setEditDays] = useState<string[]>([]);
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editParentalCode, setEditParentalCode] = useState('');
  const [tempsEcranId, setTempsEcranId] = useState("");

  const handleDaysChange = (day: string) => {
    setEditDays((prevDays) => (prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]));
  };

  console.log(initialProfile?.id);

  // Faire la requete qui nous permettra d'avoir le tempsEcranId :
  useEffect(() => {
    const fetchTempsEcran = async () => {
        try {
          const tempsEcranResponse = await fetch(
            `http://127.0.0.1:8000/enfant/${initialProfile?.id}/temps_ecran`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
          );

          if (!tempsEcranResponse.ok) {
              throw new Error(`Erreur lors de la récupération du temps d'ecran de ${initialProfile?.pseudo}`);
          }

          const data = await tempsEcranResponse.json();
          console.log("Data :", data)
          console.log(`ID du temps d'ecran de ${initialProfile?.pseudo} : ${data[0].id}`);
          setTempsEcranId(data[0].id)
          setEditStartTime(data[0].heuresD);
          setEditEndTime(data[0].heuresF);
          // setEditDays(data[0].joursA);
        } catch (error) {
          console.error("Erreur:", error);
        }
  };
    fetchTempsEcran();
  }, []);

  const handleSubmit = async () => {
    onSubmit({editPseudo, editImage, editAge, editPin });
    onClose();

    try {
      // Update l'enfant
      const enfantUpdateResponse = await fetch(`http://localhost:8000/enfant/${initialProfile?.id}`, { // 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo: editPseudo,
          age: editAge,
          image_profil: editImage,
          code_pin: editPin,
        }),
      });

      console.log("Donnees de l'update de l'enfant :", JSON.stringify({
        pseudo: editPseudo,
        age: editAge,
        image_profil: editImage,
        code_pin: editPin,
      }));
  
      if (!enfantUpdateResponse.ok) {
        throw new Error("Erreur lors de l'update de l'enfant");
      }
  
      const updateEnfant = await enfantUpdateResponse.json();
      console.log("Update des informations de l'enfant :", updateEnfant);
         
      // Update le temps d'écran
      const tempsUpdateEcranResponse = await fetch(`http://localhost:8000/tempsEcran/${tempsEcranId}`, { // ${}
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heuresD: editStartTime,
          heuresF: editEndTime,
          joursA: editDays
        }),
      });

      console.log(JSON.stringify({
        heuresD: editStartTime,
          heuresF: editEndTime,
          joursA: editDays,
      }));
  
      if (!tempsUpdateEcranResponse.ok) {
        throw new Error("Erreur lors de l'update du temps d'écran");
      }
  
      console.log("Update de l'enfant et temps d'écran faits avec succès");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl mb-4"></h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm" >pseudo</label>
            <input className="w-full p-2 border rounded" value={editPseudo} onChange={(e) => setEditPseudo(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Image Profil</label>
            <input type="file" className="w-full p-2 border rounded" onChange={(e) => setEditImage(URL.createObjectURL(e.target.files?.[0]!))} />
          </div>
          {initialProfile ? (
            <>
              <div>
                <label className="block text-sm">Age</label>
                <input type="number" className="w-full p-2 border rounded" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Code PIN</label>
                <input type="password" className="w-full p-2 border rounded" value={editPin} onChange={(e) => setEditPin(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Jours de connexion</label>
                <div className="flex flex-wrap gap-2">
                  {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((editDay) => (
                    <button
                      key={editDay}
                      className={`p-2 border rounded ${editDays.includes(editDay) ? 'bg-yellow-700' : 'bg-white'}`}
                      onClick={() => handleDaysChange(editDay)}
                    >
                      {editDay}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm">Heure de début</label>
                  <input type="time" className="w-full p-2 border rounded" value={editStartTime} onChange={(e) => setEditStartTime(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm">Heure de fin</label>
                  <input type="time" className="w-full p-2 border rounded" value={editEndTime} onChange={(e) => setEditEndTime(e.target.value)} />
                </div>
              </div>
            </>
          ) : (
            <>
              
              
              <div>
                <label className="block text-sm">Age</label>
                <input type="number" className="w-full p-2 border rounded" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Code PIN</label>
                <input type="password" className="w-full p-2 border rounded" value={editPin} onChange={(e) => setEditPin(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Jours de connexion</label>
                <div className="flex flex-wrap gap-2">
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((editDay) => (
                    <button
                      key={editDay}
                      className={`p-2 border rounded ${editDay.includes(editDay) ? 'bg-yellow-700' : 'bg-white'}`}
                      onClick={() => handleDaysChange(editDay)}
                    >
                      {editDay}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm">Heure de début</label>
                  <input type="time" className="w-full p-2 border rounded" value={editStartTime} onChange={(e) => setEditStartTime(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm">Heure de fin</label>
                  <input type="time" className="w-full p-2 border rounded" value={editEndTime} onChange={(e) => setEditEndTime(e.target.value)} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-4 mt-4">
          <button onClick={handleSubmit} className="p-2 bg-yellow-700 rounded">Enregistrer</button>
          <button onClick={onClose} className="p-2 bg-gray-400 rounded">Annuler</button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmation = ({ onConfirm, onCancel, initialProfile}: { onConfirm: () => void; onCancel: () => void; initialProfile?:Profile; }) => {
  // initialProfile?: Profile,

 
  useEffect(() => {
    const fetchTempsEcran = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/enfant/delete/${initialProfile?.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

    
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du profil');
        }
    
        // Suppression réussie, mettre à jour l'interface utilisateur en conséquence
        // setShowDeleteConfirmation(false);
        // setProfileIdToDelete(null);
        // Rafraîchir les profils ou effectuer d'autres actions nécessaires
      } catch (error) {
        console.error("Erreur:", error);
      }

    };
    fetchTempsEcran();
}, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-xl mb-4">Êtes-vous sûr de vouloir supprimer ce profil ?</h2>
        <div className="flex space-x-4 justifiy-center">
          <button onClick={onConfirm} className="p-2 bg-red-600 text-white rounded">Oui</button>
          <button onClick={onCancel} className="p-2 bg-gray-200 rounded">Non</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showParentEditForm, setShowParentEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const [loggedParent, setLoggedParent] = useState<Parent>(defaultParent);
  const [readenfant, setReadEnfant] = useState<Profile[]>();
  const [showReadProfile, setShowReadProfile] = useState<Boolean>(false);

  // useEffect(()=> {
  //   const parent=localStorage.getItem("connectedUser");
  //   if(parent){
  //     setLoggedParent(JSON.parse(parent));
  //     setReadEnfant(JSON.parse(parent).enfants)
  //     console.log("Readenfant :", JSON.parse(parent).enfants);
  //   }
  // }, []);

  useEffect(() => {
    const fetchParentData = async () => {
      const parentData = localStorage.getItem("connectedUser");
      if (parentData) {
        const parentJSON = JSON.parse(parentData);
      
        console.log("parentJSON :", parentJSON)
        
        try {
          const parentResponse = await fetch(
            `http://127.0.0.1:8000/parent/get/${parentJSON.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          if (!parentResponse.ok) {
            throw new Error("Erreur lors de la récupération des données du parent");
          }

          const updatedParentData = await parentResponse.json();

          console.log("updatedParentData :", updatedParentData);

          localStorage.setItem("connectedUser", JSON.stringify(updatedParentData));

          setLoggedParent(updatedParentData);

          setReadEnfant(updatedParentData.enfants);
          console.log("readenfant :", updatedParentData.enfants);
        } catch (error) {
          console.error("Erreur:", error);
        }
      }
    };

    fetchParentData();
  }, []);

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const openEditForm = (profile: Profile) => {
    console.log("profile :", profile)
    if (profile.pseudo === 'Nom du Profil Parent') {
      setShowParentEditForm(true);
    } else {; 
      setSelectedProfile(profile);
      setShowEditForm(true);
    }
  };

  const openDeleteConfirm = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowDeleteConfirm(true);
  };

  const openReadProfile=(profile: Profile)=>{
    setSelectedProfile(profile);
    setShowReadProfile(true);
  }



  const closeForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowParentEditForm(false);
    setShowDeleteConfirm(false);
    setShowReadProfile(false);
  };

  const handleAddProfile = (profile: Profile) => {
    // Add profile logic here
    console.log('Adding profile:', profile);
    closeForm();
  };

  const handleEditProfile = (profile: Profile) => {
    // Edit profile logic here
    console.log('Editing profile:', profile);
    closeForm();
  };

  const handleDeleteProfile = () => {
    // Delete profile logic here
    console.log('Deleting profile:', selectedProfile);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex flex-col bg-gradient-to-l from-yellow-100 bg-opaticy-200 to-yellow-50 min-h-screen bg-white font-Grandstander text-black">
      <div className="flex-grow p-8 space-y-8">
        {/* Première carte */}
        <div className="bg-yellow-700 p-6 rounded-lg mb-8 shadow-lg max-w-3xl mx-auto">
          <div className="flex items-center space-x-4 mb-4 cursor-pointer" onClick={() => setShowParentEditForm(true)}>
            <FaUser className="text-black" size={40} />
            <div>
              <h2 className="text-white font-semibold text-2xl">{loggedParent.nom}</h2>
              <p className="text-gray-900">Bienvenue, vous avez {readenfant?.length} profils enfants.</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-start">
            <button onClick={() => setShowParentEditForm(true)} className="text-black p-2 rounded-lg flex items-center justify-center space-x-1">
              <FaEdit /> <span>Modifier Profil</span>
            </button>
            <button onClick={openAddForm} className="text-black p-2 rounded-lg flex items-center justify-center space-x-1">
              <FaPlus /> <span>Ajouter</span>
            </button>
            <button className="text-black p-2 rounded-lg flex items-center justify-center space-x-1">
              <FaSignOutAlt /> <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Deuxième carte */}
        <div className="dark:bg-yellow-700 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h3 className="text-black text-xl mb-4">Profils Enfants</h3>
          <div className="space-y-4">
            {readenfant?.map((profile, index) => (
              <ProfileCard
                key={index}
                pseudo={profile?.pseudo}
                image={profile?.image}
                onEdit={() => openEditForm(profile)}
                onDelete={() => openDeleteConfirm(profile)}
                readProfile={()=> openReadProfile(profile)}
                onHistory={() => window.location.href = '/history'} // Replace with proper routing logic
              />
            ))}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer component */}
      
      {showAddForm && <ProfileForm onClose={closeForm} onSubmit={handleAddProfile} loggedParentId={loggedParent.id} />}
      {showEditForm && selectedProfile && <ProfileEditForm initialProfile={selectedProfile} onClose={closeForm} onSubmit={handleEditProfile} />}
      {showParentEditForm && (
        <ParentProfileForm onClose={closeForm} onSubmit={handleEditProfile} />
      )}
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={handleDeleteProfile}
          onCancel={() => setShowDeleteConfirm(false)}
          initialProfile={selectedProfile}
        />
      )}
      {
        showReadProfile && <VoirProfil onClose={closeForm} initialProfile={selectedProfile} />
      }
    </div>
  );
};

const ParentProfileForm = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (profile: Profile) => void }) => {
  const [pseudo, setPseudo] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [parentalCode, setParentalCode] = useState('');

  const handleSubmit = () => {
    onSubmit({ pseudo:"", image: '/images/parent-profile.png' }); // Dummy image for parent profile
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Modifier Profil Parent</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm">Nom</label>
            <input className="w-full p-2 border rounded" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm">Age</label>
              <input type="number" className="w-full p-2 border rounded" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm">Contact</label>
              <input type="text" className="w-full p-2 border rounded" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Pays</label>
              <select className="w-full p-2 border rounded" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Sélectionner un pays</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Canada">Canada</option>
                {/* Ajouter d'autres pays au besoin */}
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm">Mot de passe</label>
              <input type="password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Code Parental</label>
              <input type="password" className="w-full p-2 border rounded" value={parentalCode} onChange={(e) => setParentalCode(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button onClick={handleSubmit} className="p-2 bg-yellow-200 rounded">Enregistrer</button>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded">Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
