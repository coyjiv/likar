'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './useAuth';

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const currentUser = useAuth();
    const { uid } = currentUser || {};

    useEffect(() => {
      if (!uid) {
        router.replace('/login');
      }
    }, [uid, router]);

    if (!currentUser) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
