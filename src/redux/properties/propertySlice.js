import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../error";
import { logout } from "../auth/authSlice";
import propertyService from "./propertyService";

const initialState = {
	list: [],
	loading: false,
};

export const getProperties = createAsyncThunk(
	"properties/list",
	async (data, thunkAPI) => {
		try {
			const res = await propertyService.getProperties(
				data.token,
				data.pageNumber,
				data.status,
				data.type,
				data.feature,
				data.minAmount,
				data.maxAmount
			);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			if (message === "Unauthorized") {
				thunkAPI.dispatch(logout());
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const propertySlice = createSlice({
	name: "properties",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProperties.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getProperties.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
			state.error = null;
		});
		builder.addCase(getProperties.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default propertySlice.reducer;
