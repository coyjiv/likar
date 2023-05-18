'use client';

import { isLoaded } from 'react-redux-firebase';
import { useAppSelector } from './redux';


const useAuth = () => {
  // @ts-ignore
  const firebaseUser = useAppSelector(state=>state.firebase.auth)
  // @ts-ignore
  const firebaseProfile = useAppSelector(state=>state.firebase.profile)


  return isLoaded(firebaseUser, firebaseProfile) && {...firebaseUser, ...firebaseProfile};
};

export default useAuth;