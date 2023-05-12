'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './useAuth';

const withDocAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const currentUser = useAuth();
    const { uid, isDoctor } = currentUser || {};

    useEffect(() => {
      if (!uid || !isDoctor) {
        router.replace('/doc/login');
      }
    }, [uid, isDoctor, router]);

    if (!currentUser || !isDoctor) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withDocAuth;
