import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/fetchUsers.js";

const initialState = {
	data: [],
	isLoading: false,
	error: null,
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: (builder) => {
		builder
		.addCase(fetchUsers.pending, (state) => {
			state.isLoading = true
		})
		.addCase(fetchUsers.fulfilled, (state, action) => {
			state.data = action.payload
			state.isLoading = false
		})
		.addCase(fetchUsers.rejected, (state, action) => {
			state.error = action.error
			state.isLoading = false
		})
	}
})

export const userReducer = usersSlice.reducer