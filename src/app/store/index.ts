'use client'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { PersistPartial } from 'redux-persist/es/persistReducer';

import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    // Add sync reducers here
    firebase: persistReducer(
      { key: 'firebaseState', storage, stateReconciler: hardSet },
      firebaseReducer
    ),
    firestore: persistReducer(
        { key: 'firestoreState', storage, stateReconciler: hardSet },
        firestoreReducer
      )
      ,
    })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState> & PersistPartial
export type AppDispatch = typeof store.dispatch

