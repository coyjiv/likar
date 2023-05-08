'use client'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase'
import { firestoreReducer, reduxFirestore } from 'redux-firestore'

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // enhancers: [
  //     reduxFirestore(firebase, firebaseConfig),
  //     reactReduxFirebase(firebase, rrfConfig),
  //   ],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


