import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../error";
import userService from "./userService";
import { logout } from "../auth/authSlice";

const initialState = {
	user_list: null,
	loading: false,
	load_role: false,
	error: null,
	roles: [],
	permissions: [],
	investors: {},
	requests: {},
};

export const listUsers = createAsyncThunk(
	"users/list",
	async (data, thunkAPI) => {
		try {
			const res = await userService.listUsers(
				data.token,
				data.status,
				data.page
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

export const listRequests = createAsyncThunk(
	"users/requests-contact",
	async (data, thunkAPI) => {
		try {
			const res = await userService.listRequests(data.page, data.token);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			// if (message === "Unauthorized") {
			// 	thunkAPI.dispatch(logout());
			// }
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const listRoles = createAsyncThunk(
	"users/roles",
	async (data, thunkAPI) => {
		try {
			const res = await userService.listRoles(data.token);
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

export const listPermissions = createAsyncThunk(
	"users/permissions",
	async (data, thunkAPI) => {
		try {
			const res = await userService.listPermissions(data.token);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const listInvestors = createAsyncThunk(
	"users/investors",
	async (data, thunkAPI) => {
		try {
			const res = await userService.listInvestors(
				data.token,
				data.page,
				data.userType
			);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listUsers.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(listUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.user_list = action.payload;
			state.error = null;
		});
		builder.addCase(listUsers.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(listRoles.pending, (state) => {
			state.load_role = true;
		});
		builder.addCase(listRoles.fulfilled, (state, action) => {
			state.load_role = false;
			state.roles = action.payload;
		});
		builder.addCase(listPermissions.fulfilled, (state, action) => {
			state.load_role = false;
			state.permissions = action.payload;
		});
		builder.addCase(listInvestors.fulfilled, (state, action) => {
			state.investors = action.payload;
		});
		builder.addCase(listRequests.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(listRequests.fulfilled, (state, action) => {
			state.loading = false;
			state.requests = action.payload;
		});
		builder.addCase(listRequests.rejected, (state) => {
			state.loading = false;
		});
	},
});

export default userSlice.reducer;
