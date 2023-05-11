'use client';

import { useAppSelector } from './redux';

const useAuth = () => {
  // @ts-ignore
  const firebaseUser = useAppSelector(state=>state.firebase.auth)


  return firebaseUser;
};

export default useAuth;