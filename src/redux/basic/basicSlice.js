import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../error";
import basicService from "./basicService";
import { logout } from "../auth/authSlice";

const initialState = {
	stats: {},
	loading: false,
	settings: {},
};

export const getStats = createAsyncThunk(
	"basic/stats",
	async (data, thunkAPI) => {
		try {
			const res = await basicService.getStats(data.token);
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

export const loadSettings = createAsyncThunk(
	"basic/settings",
	async (data, thunkAPI) => {
		try {
			const res = await basicService.loadSettings();
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

export const basicSlice = createSlice({
	name: "basic",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getStats.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getStats.fulfilled, (state, action) => {
			state.loading = false;
			state.stats = action.payload;
			state.error = null;
		});
		builder.addCase(getStats.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(loadSettings.fulfilled, (state, action) => {
			state.settings = action.payload;
		});
	},
});

export default basicSlice.reducer;
