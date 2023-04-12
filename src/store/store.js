import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./slices/usersSlice.js";


export const store = configureStore({
	reducer: {
		users: userReducer
	}
})


export * from './thunks/fetchUsers.js'