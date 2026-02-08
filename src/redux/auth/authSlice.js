import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../error";
import authService from "./authService";
import userService from "../users/userService";

const initialState = {
	user_details: null,
	loading: false,
	error: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
	try {
		const res = await authService.login(data);
		return res.data;
	} catch (error) {
		const message = displayError(error, true);
		return thunkAPI.rejectWithValue(message);
	}
});

export const verifyOtp = createAsyncThunk(
	"auth/verify",
	async (data, thunkAPI) => {
		try {
			const res = await authService.verifyOtp(data);
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const userProfile = createAsyncThunk(
	"auth/userDetails",
	async (data, thunkAPI) => {
		try {
			const res = await userService.userDetails(data.token, data.id);
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

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user_details = null;
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user_details = action.payload;
			state.error = null;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(verifyOtp.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(verifyOtp.fulfilled, (state, action) => {
			state.loading = false;
			state.user_details = action.payload;
			state.error = null;
		});
		builder.addCase(verifyOtp.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(userProfile.fulfilled, (state, action) => {
			state.user_details = {
				...action.payload,
				access_token: state.user_details.access_token,
			};
		});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
