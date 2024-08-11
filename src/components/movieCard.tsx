import { FaPlay } from "react-icons/fa"
import Image from 'next/image';
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useEffect } from "react";
const MovieCard = () => {
    
    const parentData = useSelector(
        (state:RootState) => state.AppStates.parentState
      )  
        useEffect(() => {
          if (parentData){
            {console.log(parentData)}
          }
        }, [parentData]);
      
    return (

      <Provider store={store}> <div>
      {/* <div> {parentData.nom}</div> */}
         {/* Cards Section */}
     <div className="flex pl-10 pr-10 mt-12 gap-6 mx-10">
       <div className="w-1/3 relative">
         <div className="rounded-xl shadow-md overflow-hidden h-60">
           <Image
             src="/images/cartoon2.jpeg"
             alt="The Adventure of Blue Sword"
             width={300}
             height={180}
             layout="responsive"
             className="object-cover"
           />
           <div className="absolute inset-0 flex items-end justify-center p-4 bg-black bg-opacity-50">
             <div className="flex items-center text-white text-lg font-bold">
               <FaPlay className="mr-2" />
               <span>Let Play Movie</span>
             </div>
           </div>
         </div>
       </div>
       <div className="w-2/3 relative">
         <div className="rounded-xl shadow-md overflow-hidden h-60">
           <Image
             src="/images/cartoon1.jpeg"
             alt="Recalling the Journey of Dol"
             width={600}
             height={150}
             layout="responsive"
             className="object-cover"
           />
           <div className="absolute inset-0 flex items-end justify-center p-4 bg-black bg-opacity-50">
             <div className="flex items-center text-white text-lg font-bold">
               <FaPlay className="mr-2" />
               <span>Let Play Movie</span>
             </div>
           </div>
         </div>
       </div>
     </div>
     </div> </Provider>
       
        
    );
  };
  
  export default MovieCard;