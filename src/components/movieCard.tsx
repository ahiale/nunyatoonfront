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
     <div className="w-1/2 relative">
         <div className="rounded-xl shadow-md overflow-hidden h-65">
           <Image
             src="/images/famille (2).jpeg"
             alt="Recalling the Journey of Dol"
             width={600}
             height={150}
             layout="responsive"
             className=" rounded-xl"
           />
         </div>
       </div>
       <div className="w-1/2 relative">
         <div className="rounded-xl shadow-md overflow-hidden h-65">
           <Image
             src="/images/enfant.jpeg"
             alt="Recalling the Journey of Dol"
             width={600}
             height={150}
             layout="responsive"
             className=" rounded-xl"
           />
         </div>
       </div>
     </div>
     </div> </Provider>
       
        
    );
  };
  
  export default MovieCard;