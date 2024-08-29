import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from './loader';


interface PrivateRouteProps {
  children: ReactNode;
  forAdmin: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, forAdmin }) => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);
  const connectedUser = typeof window !== 'undefined' ? localStorage.getItem('connectedUser') : null;
  const connectedAdmin = typeof window !== 'undefined' ? localStorage.getItem('ConnectedAdmin') : null;

  useEffect(() => {
    const checkAccess = () => {
      const storedAdmin = typeof window !== 'undefined' ? localStorage.getItem('connectedAdmin') : null;
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('connectedUser') : null;
  
      if (forAdmin) {
        if (!storedAdmin) {
          router.push('/adminLogin'); 
          return;
        }
      } else {
        if (!storedUser) {
          router.push('/login'); 
          return;
        }
      }
  
      setRedirecting(false);
    };
  
    checkAccess();
  }, [connectedAdmin, connectedUser, forAdmin, router]);

  if (redirecting) {
    return <Loader />; 
  }

  return <>{children}</>;
};

export default PrivateRoute;
