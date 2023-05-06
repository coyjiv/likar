'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        // currentUser: currentUserSlice,
        // patients: patientsSlice,
        // doctors: doctorsSlice,
        // appointments: appointmentsSlice,
        // chats
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;