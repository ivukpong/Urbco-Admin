import axios from "axios";
import { url } from "../config";
import { headers } from "../headers";

const login = async (data) => {
	const response = await axios.post(`${url}/auth/login`, data, {
		headers,
	});
	if (response.data) {
		return response.data;
	}
};

const verifyOtp = async (data) => {
	const response = await axios.post(`${url}/auth/verify-otp`, data, {
		headers,
	});
	if (response.data) {
		return response.data;
	}
};

const authService = {
	login,
	verifyOtp,
};

export default authService;
