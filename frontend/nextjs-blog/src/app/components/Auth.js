'use client'
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';
import { getLocalStorageItem } from '../utils/utils';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const isAuthenticated = getLocalStorageItem()

    useEffect(() => {
      if (!(!!isAuthenticated)) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
