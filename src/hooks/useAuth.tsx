'use client';

import { isLoaded } from 'react-redux-firebase';
import { useAppSelector } from './redux';


const useAuth = () => {
  // @ts-ignore
  const firebaseUser = useAppSelector(state=>state.firebase.auth)


  return isLoaded(firebaseUser) && firebaseUser;
};

export default useAuth;