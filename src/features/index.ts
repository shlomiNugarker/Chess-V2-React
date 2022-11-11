import { configureStore } from '@reduxjs/toolkit'

import gameReducer from './game/gameSlice'
import authReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
