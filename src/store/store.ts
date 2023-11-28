import { configureStore } from "@reduxjs/toolkit";
import { reducer as appReducer } from "./appSlice";


export const store = configureStore({
	reducer: {
		app: appReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch