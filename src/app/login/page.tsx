import Link from "next/link";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  return (
    <div
      className="flex justify-center items-center h-screen font-Grandstander"
      style={{
        backgroundImage: "url(/images/fond.jpg",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

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
  );
};

export default Login;

// import Cookies from "js-cookie";

// export default function Login() {

//   async function login(formData: FormData) {
//     'use server'
//     // e.preventDefault() e: any,
//     const rawFormData = {
//       mail: formData.get('mail'),
//       password: formData.get('password')
//     }
//     try {
//       // ...
//       const res = await fetch('http://localhost:8000/parent/login', {method: 'POST', body:JSON.stringify(rawFormData)})

//       const data = await res.json();
//       console.log(data)

//       if(data)
//       {
//         Cookies.set('token', data);
//       }
//     } catch (error) {
//       alert(" incorrect")

//       console.log(error)
//     }

//     // revalidateTag('posts') // Update cached posts
//     redirect(`/profil`) // Navigate to the new post page
//     // ...
//     // console.log(params)
//   }

//   return (

//     <div
//     className="flex justify-center items-center h-screen font-Grandstander"
//     style={{ backgroundImage: 'url(/images/image1.jpg', backgroundSize: 'cover', backgroundPosition: 'center' }}
//   >

//     <div className="w-1/3 h-screen hidden lg:block ">
//       <img src="/images/login.png"alt="Placeholder Image" className="object-cover w-full h-full"/>
//     </div>

//     <div className="lg:p-20 md:p-20 sm:20 p-6 w-full lg:w-1/2">
//       <h2 className="text-4xl mb-1 font-Grandstander font-bold text-black ">SE CONNECTER</h2>
//       <LoginForm login={login} />

//       <div className="mt-6 text-blue-500 text-center font-normal">

//       <Link href="/register" className="text-black hover:text-white" >Creer un compte </Link>
//        <div className="mt-3 text-blue-500 text-center"> <Link href="/home" className="text-black hover:text-white" > page d'acceuil </Link>
//        </div>

//       </div>

//     </div>
//     </div>
//   );
// }
