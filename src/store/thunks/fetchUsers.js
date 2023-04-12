import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetch', (async () => {
	try {
		const response = await axios.get('http://localhost:3005/users')

		// helper
		await pause(10000)
		return response.data
	} catch (error) {

		return error
	}
}))

// helper
const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration)
	})
}


export {fetchUsers}