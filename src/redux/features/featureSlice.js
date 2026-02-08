import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../error";
import { logout } from "../auth/authSlice";
import featureService from "./featureService";

const initialState = {
	list: [],
	loading: false,
	types: [],
};

export const getFeatures = createAsyncThunk(
	"features/list",
	async (data, thunkAPI) => {
		try {
			const res = await featureService.getFeatures(
				data.token,
				data.status
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

export const getTypes = createAsyncThunk(
	"features/types",
	async (data, thunkAPI) => {
		try {
			const res = await featureService.getTypes(data.token, data.status);
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

export const featureSlice = createSlice({
	name: "features",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFeatures.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getFeatures.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
			state.error = null;
		});
		builder.addCase(getFeatures.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(getTypes.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getTypes.fulfilled, (state, action) => {
			state.loading = false;
			state.types = action.payload;
			state.error = null;
		});
		builder.addCase(getTypes.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default featureSlice.reducer;
