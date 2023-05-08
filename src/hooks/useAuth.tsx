'use client';

import { useAppSelector } from './redux';

const useAuth = () => {
  const firebaseUser = useAppSelector(state=>state.firebase.auth)


  return firebaseUser;
};

export default useAuth;