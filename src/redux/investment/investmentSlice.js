import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../error";
import { logout } from "../auth/authSlice";
import investmentService from "./investmentService";

const initialState = {
	list: {},
	payments: {},
	loading: false,
	reports: {},
};

export const getInvestments = createAsyncThunk(
	"investment/list",
	async (data, thunkAPI) => {
		try {
			const res = await investmentService.getInvestments(
				data.token,
				data.plan,
				data.page,
				data.investor
			);
			return res;
		} catch (error) {
			const message = displayError(error, false);
			if (message === "Unauthorized") {
				thunkAPI.dispatch(logout());
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getInvestmentReports = createAsyncThunk(
	"investment/reports",
	async (data, thunkAPI) => {
		try {
			const res = await investmentService.getInvestmentReports(
				data.token,
				data.property,
				data.investor
			);
			return res;
		} catch (error) {
			const message = displayError(error, false);
			if (message === "Unauthorized") {
				thunkAPI.dispatch(logout());
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getPayments = createAsyncThunk(
	"investment/payments",
	async (data, thunkAPI) => {
		try {
			const res = await investmentService.getPayments(
				data.token,
				data.status,
				data.page
			);
			return res;
		} catch (error) {
			const message = displayError(error, false);
			if (message === "Unauthorized") {
				thunkAPI.dispatch(logout());
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const investmentSlice = createSlice({
	name: "investments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPayments.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getPayments.fulfilled, (state, action) => {
			state.loading = false;
			state.payments = action.payload;
			state.error = null;
		});
		builder.addCase(getPayments.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(getInvestments.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getInvestments.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
			state.error = null;
		});
		builder.addCase(getInvestments.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(getInvestmentReports.fulfilled, (state, action) => {
			state.reports = action.payload;
		});
	},
});

export default investmentSlice.reducer;
