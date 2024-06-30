import Image from "next/image";

function Banner() {
  return (
    
      <div style={{ margin: '100px' }}>
        <div className=" font-Grandstander text-5xl font-semibold text-white ">
        <span className=""> BOOSTEZ </span> <br></br>
          <span className="text-black"> CULTURE ET EDUCATION <br></br></span> 
         <span className="text-white ">  DE VOS ENFANTS </span></div>
        <button className="bg-red-600 hover:bg-white hover:text-black text-white font-bold py-2 px-5 rounded-full mt-6 font-Grandstander  ">
          En cliquant ici
        </button>
      </div>

  )
}

export default Banner;