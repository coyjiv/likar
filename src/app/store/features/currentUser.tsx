import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

// Define a type for the slice state
interface CurrentUserState {
  value: number
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  value: 0,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
})

export const { } = currentUserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.currentUser.value

export default currentUserSlice.reducer