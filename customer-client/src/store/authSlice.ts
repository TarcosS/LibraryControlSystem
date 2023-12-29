import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
    "company_name": string,
    "cus_name": string,
    "email": string,
    "lang": string,
    "name": string,
    "packet_id": number,
    "role": string,
    "scrap_status": boolean,
    "status": boolean,
    "user_id": number,
    "verified": boolean
}

export interface AuthResponse {
    token: string,
}
export interface AuthState {
  user: any,
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      console.log('hi')
      state.token = action.payload.token;
    },
    logout: (state) => {
        state.user = null;
        state.token = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions

export default authSlice.reducer