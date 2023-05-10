'use client'

import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { store, persistor } from '.'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { createFirestoreInstance } from 'redux-firestore'
import { getAuth } from 'firebase/auth'
import { PersistGate } from 'redux-persist/integration/react'

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
// export const auth = initializeAuth(firebaseInstance)
export const auth = getAuth(firebaseInstance)
// const analytics = getAnalytics(app);

const rrfProps = {
  firebase: firebaseInstance,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  auth,
}

export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {children}
        </ReactReduxFirebaseProvider>
      </PersistGate>
    </Provider>
  )
}
