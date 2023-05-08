'use client'

import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { store } from '.'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createFirestoreInstance } from 'redux-firestore'
import { getAuth, initializeAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

console.log(firebaseConfig)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

// Initialize Firebase
export const firebaseInstance = firebase.initializeApp(firebaseConfig)
export const auth = initializeAuth(firebaseInstance)
// const analytics = getAnalytics(app);

const rrfProps = {
  firebase: firebaseInstance,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
